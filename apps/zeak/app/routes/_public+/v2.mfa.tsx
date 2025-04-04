// app/routes/auth.mfa.tsx
import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form, useActionData, useFetcher, useLoaderData, useNavigation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { Alert, AlertDescription, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input } from "@zeak/react";

import { getSupabase } from "~/lib/supabase";
import { getAuthSession, requireAuthSession } from "~/services/session.server";
import { path } from "~/utils/path";

// Type definitions
type Factor = {
  id: string;
  friendly_name?: string;
  factor_type: 'totp' | 'phone';
  status: 'verified' | 'unverified';
  created_at: string;
  updated_at: string;
};

type FactorsResponse = {
  all: Factor[];
  totp: Factor[];
  phone: Factor[];
};

type FactorType = 'totp' | 'phone';

type LoaderDataType = {
  needsSetup: boolean;
  qrCode?: string;
  secret?: string;
  factorId?: string;
  factorName?: string;
  factorCreatedAt?: string;
  error?: string;
  setupStep?: 'select' | 'setup';
  enrolledFactors?: FactorsResponse;
};

type ActionData = {
  error?: string;
  success?: boolean;
};


export async function loader({ request }: LoaderFunctionArgs) {
  // const supabase = getSupabase(request);

  const { accessToken } = await requireAuthSession(request, { verify: true });

  try {
    // Get the current session
    const sessionDataTwo = await getAuthSession(request);

    if (!sessionDataTwo?.accessToken) {
      return redirect("v2/login");
    }

    // Check if user has any factors
    const { data, error: factorsError } = await getSupabase(accessToken).auth.mfa.listFactors();

    if (factorsError) {
      return json({
        error: "Failed to list MFA factors",
        needsSetup: false
      });
    }

    // Cast data to correct type
    const factorsData = data as FactorsResponse;

    // Check if user needs MFA setup (no verified TOTP factors)
    const needsSetup = factorsData.totp.length === 0;

    if (needsSetup) {
      return json({
        needsSetup: true,
        setupStep: 'select',
        enrolledFactors: factorsData,
        factorId: undefined,
        factorName: undefined,
        factorCreatedAt: undefined,
        verifiedFactor: undefined
      });
    }

    // if (needsSetup) {
    //   // Enroll and get QR code if setup is needed
    //   const { data: enrollData, error: enrollError } = await getSupabase(accessToken).auth.mfa.enroll({
    //     factorType: 'totp'
    //   });

    //   if (enrollError) {
    //     return json({
    //       error: "Failed to enroll MFA",
    //       needsSetup: true
    //     });
    //   }

    //   return json({
    //     needsSetup: true,
    //     qrCode: enrollData.totp.qr_code,
    //     secret: enrollData.totp.secret,
    //     factorId: enrollData.id,
    //   });
    // }

    // Get the first verified factor (prioritize TOTP over phone)
    const verifiedFactor = factorsData.totp[0] || factorsData.phone[0];

    return json({
      needsSetup: false,
      factorId: verifiedFactor?.id,
      factorName: verifiedFactor?.friendly_name,
      factorCreatedAt: verifiedFactor?.created_at,
      enrolledFactors: factorsData,
      verifiedFactor: verifiedFactor
    });

  } catch (error) {
    console.error('MFA Error:', error);
    return json({
      error: "An unexpected error occurred",
      needsSetup: false
    });
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const { accessToken } = await requireAuthSession(request, { verify: true });

  try {
    const formData = await request.formData();
    const factorType = formData.get("factorType") as FactorType;
    const token = formData.get("token") as string;
    const isSetup = formData.get("isSetup") === "true";
    const factorId = formData.get("factorId") as string;
    const phone = formData.get("phone") as string;

    // Initial factor enrollment (TOTP or Phone)
    if (factorType && !token) {
      if (factorType === 'totp') {
        const { data: enrollData, error: enrollError } = await getSupabase(accessToken).auth.mfa.enroll({
          factorType: 'totp'
        });

        if (enrollError) {
          return json({ error: enrollError.message });
        }

        return json({
          needsSetup: true,
          setupStep: 'setup',
          qrCode: enrollData.totp.qr_code,
          secret: enrollData.totp.secret,
          factorId: enrollData.id,
          factorType: 'totp'
        });
      }

      if (factorType === 'phone') {
        if (!phone) {
          return json({ error: "Phone number is required" });
        }

        const { data: enrollData, error: enrollError } = await getSupabase(accessToken).auth.mfa.enroll({
          factorType: 'phone',
          phone
        });

        if (enrollError) {
          return json({ error: enrollError.message });
        }

        return json({
          needsSetup: true,
          setupStep: 'setup',
          factorId: enrollData.id,
          factorType: 'phone',
          phone
        });
      }
    }

    // Handle verification (both setup and regular login)
    if (token && factorId) {
      if (isSetup) {
        // Initial setup verification
        const { data: challengeData, error: challengeError } = await getSupabase(accessToken).auth.mfa.challenge({
          factorId
        });

        if (challengeError) {
          return json({ error: challengeError.message });
        }

        // Verify the challenge during setup
        const { data: verifyData, error: verifyError } = await getSupabase(accessToken).auth.mfa.verify({
          factorId,
          challengeId: challengeData.id,
          code: token
        });

        if (verifyError) {
          return json({ error: verifyError.message });
        }

        // If verification successful during setup
        if (verifyData) {
          return redirect(path.to.authenticatedRoot);
        }
      } else {
        // Regular login verification - use challengeAndVerify for simplicity
        const { data: verifyData, error: verifyError } = await getSupabase(accessToken).auth.mfa.challengeAndVerify({
          factorId,
          code: token,
        });

        if (verifyError) {
          return json({
            error: verifyError.message,
            success: false
          });
        }

        // If verification successful during login
        if (verifyData) {
          return redirect(path.to.authenticatedRoot);
        }
      }
    }

    return json({ error: "Invalid request" });

  } catch (error: any) {
    console.error('MFA Action Error:', error);
    return json<ActionData>({
      error: error.message || 'Verification failed',
      success: false
    });
  }
}

export default function MFAPage() {
  const loaderData = useLoaderData<LoaderDataType>();
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formRef = useRef<HTMLFormElement>(null);
  const [countdown, setCountdown] = useState(30);
  const [phone, setPhone] = useState("");
  const [selectedFactor, setSelectedFactor] = useState<FactorType | null>(null);
  const [totpData, settotpData] = useState<any>()


  const fetcher = useFetcher();

  useEffect(() => {
    if (navigation.state === "idle" && formRef.current) {
      formRef.current.reset();
    }
  }, [navigation.state]);

  useEffect(() => {
    if (fetcher?.data) {
      settotpData(fetcher.data)
    }
  }, [fetcher]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const renderVerificationForm = (factorType: FactorType) => (
    <Form method="post" ref={formRef} className="space-y-6">
      {actionData?.error && (
        <Alert variant="destructive">
          <AlertDescription>{actionData.error}</AlertDescription>
        </Alert>
      )}

      <input
        type="hidden"
        name="factorId"
        value={loaderData?.factorId || (totpData && totpData.factorId)}
      />

      <input
        type="hidden"
        name="isSetup"
        value={loaderData.needsSetup.toString()}
      />

      <input
        type="hidden"
        name="factorType"
        value={factorType}
      />

      {factorType === 'phone' && (
        <input
          type="hidden"
          name="phone"
          value={phone}
        />
      )}

      <div className="space-y-4">
        <div>
          <Input
            type="text"
            name="token"
            placeholder="Enter verification code"
            pattern="[0-9]*"
            inputMode="numeric"
            maxLength={6}
            required
            autoComplete="one-time-code"
            className="text-center text-2xl tracking-widest"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Verifying..." : "Verify Code"}
        </Button>
      </div>
    </Form>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            {loaderData.setupStep === 'select'
              ? "Choose Authentication Method"
              : loaderData.needsSetup
                ? "Set Up Two-Factor Authentication"
                : "Two-Factor Authentication"}
          </CardTitle>
          <CardDescription className="text-center">
            {(loaderData.setupStep === 'select' || totpData?.setupStep === 'select')
              ? "Select your preferred method to secure your account"
              : loaderData.needsSetup
                ? selectedFactor === 'totp'
                  ? "Scan the QR code with your authenticator app"
                  : "Enter the verification code sent to your phone"
                : "Enter the verification code to continue"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {(loaderData.setupStep === 'select' && !totpData) ? (
            <div className="space-y-6">
              {actionData?.error && (
                <Alert variant="destructive">
                  <AlertDescription>{actionData.error}</AlertDescription>
                </Alert>
              )}

              <Form method="post" className="space-y-6">
                <div className="grid gap-4">
                  <Button
                    // type="button"
                    // name="factorType"
                    // value="totp"
                    variant="outline-primary"
                    className="h-20"
                    onClick={() => {
                      fetcher.submit({ factorType: 'totp' }, { method: "POST" });
                      setSelectedFactor('totp')
                    }}
                  >
                    <div className="space-y-2">
                      <div className="font-semibold">Authenticator App</div>
                      <div className="text-xs text-muted-foreground">
                        Use Google Authenticator or similar apps
                      </div>
                    </div>
                  </Button>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">Or</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      className="mb-2"
                    />
                    <Button
                      type="submit"
                      name="factorType"
                      value="phone"
                      variant="outline-primary"
                      className="w-full"
                      disabled={!phone}
                      onClick={() => {
                        fetcher.submit({ factorType: 'phone' }, { method: "POST" });
                        setSelectedFactor('phone')
                      }}
                    >
                      <div className="space-y-2">
                        <div className="font-semibold">Phone Authentication</div>
                        <div className="text-xs text-muted-foreground">
                          Receive codes via SMS
                        </div>
                      </div>
                    </Button>
                    <input type="hidden" name="phone" value={phone} />
                  </div>
                </div>
              </Form>
            </div>
          ) : (
            <div className="space-y-6">
              {(loaderData.needsSetup || (totpData && totpData.needsSetup && totpData.qrCode)) && (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <img
                      src={totpData && totpData.qrCode}
                      alt="QR Code for authenticator app"
                      className="w-48 h-48"
                    />
                  </div>
                  {totpData && totpData.secret && (
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        Manual entry code:
                      </p>
                      <code className="bg-muted px-2 py-1 rounded text-sm">
                        {totpData.secret}
                      </code>
                    </div>
                  )}
                </div>
              )}

              {renderVerificationForm(selectedFactor || 'totp')}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          {!loaderData.needsSetup && (
            <>
              <p className="text-sm text-muted-foreground text-center">
                {countdown > 0 ? (
                  `You can request a new code in ${countdown} seconds`
                ) : (
                  <Button
                    variant="link"
                    className="p-0"
                    onClick={() => setCountdown(30)}
                  >
                    Request new code
                  </Button>
                )}
              </p>
              <Button
                variant="link"
                onClick={() => window.history.back()}
                className="text-sm"
              >
                Back to login
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
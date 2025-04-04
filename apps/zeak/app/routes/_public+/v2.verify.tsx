// app/routes/auth.verify.tsx
import { ActionFunctionArgs, createCookie, createMemorySessionStorage, json, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import { useState } from 'react';
import { SESSION_SECRET } from '~/config/env';
import { getSupabaseServiceRole } from '~/lib/supabase';
import { getCompaniesForUser } from '~/modules/users';
import { UserAuthSessionInfo } from '~/services/auth';
import { createUserSession, makeAuthSession, sendVerificationOTP, verifyOTP } from '~/services/auth/auth.server';
import { commitAnySession, commitAuthSession, getSession } from '~/services/session.server';
import { path } from '~/utils/path';
// import { verifyOTP } from '~/utils/supabase.server';




export async function loader({ request }: LoaderFunctionArgs) {
  // Extract all possible parameters from the URL
  const url = new URL(request.url);
  const token = url.searchParams.get('token');
  const type = url.searchParams.get('type');
  const email = url.searchParams.get('email');
  let userId = url.searchParams.get('userId');

  console.log(url)

  // Log incoming request parameters for debugging
  console.log('Verification request parameters:', { token, type, email, userId });

  try {
    // Handle token verification from URL
    if (token) {
      console.log('Processing token verification for:', email);

      // Verify the token with Supabase
      const { data: { user }, error } = await getSupabaseServiceRole().auth.verifyOtp({
        // email,
        token_hash: token,
        type: 'invite' // Default to signup if type is not provided
      });

      if (error || !user) {
        console.error('Token verification failed:', error);
        return redirect(path.to.signup);
      }

      // Store verified user information in session
      const session = await getSession(request);
      session.set('verifiedUserId', user.id);

      // Redirect to setup password with user ID
      return redirect(`${path.to.setuppassword}?userId=${user.id}`, {
        headers: {
          'Set-Cookie': await commitAnySession(session)
        }
      });
    }

    // Handle case where only userId is provided (normal signup flow)
    if (userId) {
      const session = await getSession(request);
      return json(
        { userId },
        {
          headers: {
            'Set-Cookie': await commitAnySession(session)
          }
        }
      );
    }

    // If no valid parameters are provided, redirect to signup
    console.log('No valid verification parameters found');
    return redirect(path.to.signup);

  } catch (error) {
    console.error('Verification process error:', error);
    return redirect(path.to.signup);
  }
}





export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const emailToken = formData.get('emailToken') as string;

  const session = await getSession(request);
  const signupData = session.get('signupData');

  if (!signupData) {
    return redirect('/v2/signup');
  }

  try {
    // Verify email OTP
    const authSessionData = await verifyOTP(signupData.email, emailToken);

    console.log('authSessionData', authSessionData, 'veriyr authSessio nData')

    // Generate and send magic link
    const { data, error } = await getSupabaseServiceRole().auth.admin.generateLink({
      type: 'magiclink',
      email: signupData.email,
      options: {
        redirectTo: '/v2/setup-password'
      }
    });

    console.log('verify error', error, 'verify error')

    if (error) throw error;

    // Clear signup session data
    session.unset('signupData');


    const sessionData: UserAuthSessionInfo = {
      userId: data.user?.id,
      // device: JSON.parse(deviceInfo),
      // location: JSON.parse(locationInfo),
      // ipAddress: JSON.parse(locationInfo).ip,
      device: 'deviceInfo',
      location: 'locationInfo',
      ipAddress: 'locationInfo',
      status: "Logged In",
      sessionActivity: "Active",
      metadata: JSON.parse(JSON.stringify(data)),
      createdBy: data.user?.id,
    };

    const usersession = await createUserSession(sessionData);

    const companies = await getCompaniesForUser(getSupabaseServiceRole(), data.user.id);

    const authSession = makeAuthSession(authSessionData.session, companies?.[0] ?? 1, usersession!.id)


    console.log('===', usersession, '===', companies, '===', authSession, '===')




    // const sessionCookie = createCookie("__session", {
    //   secrets: [SESSION_SECRET],
    //   sameSite: true,
    // });

    // const { getSession, commitSession, destroySession } =
    //   createMemorySessionStorage({
    //     cookie: sessionCookie,
    //   });



    // return json(
    //   // {
    //   //   success: true,

    //   // },
    //   redirect(path.to.authenticatedRoot),
    //   {
    //     headers: {
    //       "Set-Cookie": await commitSession(usersession),
    //     },
    //   },
    // );

    // redirect(path.to.authenticatedRoot)


    return redirect(`${path.to.setuppassword}?userId=${data.user.id}`, {
      headers: {
        "Set-Cookie": await commitAuthSession(request, {
          authSession,
        }),
      },
    });
  } catch (error) {
    console.log('verify error here', error, 'verify error here')
    return json({ error: error.message }, { status: 400 });
  }
}

export default function Verify() {
  const [timer, setTimer] = useState(30);
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  // Add countdown timer logic here

  async function handleResendOTP() {
    // const session = await getSession();
    // const signupData = session.get('signupData');
    // if (signupData) {
    //   await sendVerificationOTP(signupData.email, signupData.phone);
    //   setTimer(30);
    // }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Verify Your Account</h1>
      <p className="mb-4">
        We've sent verification codes to your email and phone. Please enter them below.
      </p>

      <Form method="post" className="space-y-4">
        <div>
          <label htmlFor="emailToken" className="block text-sm font-medium">
            Email Verification Code
          </label>
          <input
            type="text"
            id="emailToken"
            name="emailToken"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        {actionData?.error && (
          <div className="text-red-600 text-sm">{actionData.error}</div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isSubmitting ? 'Verifying...' : 'Verify'}
        </button>

        <button
          type="button"
          onClick={handleResendOTP}
          disabled={timer > 0}
          className="w-full text-sm text-blue-600 hover:text-blue-500"
        >
          {timer > 0 ? `Resend code in ${timer}s` : 'Resend verification code'}
        </button>
      </Form>
    </div>
  );
}
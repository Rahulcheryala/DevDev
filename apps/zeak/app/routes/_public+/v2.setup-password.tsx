// // app/routes/auth.setup-password.tsx
// import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node';
// import { Form, useActionData, useLoaderData, useNavigation } from '@remix-run/react';
// // import { setupPassword, validatePassword } from '~/utils/supabase.server';
// import { useState } from 'react';
// import { RiEyeLine, RiEyeOffLine, RiCheckLine, RiCloseLine } from 'react-icons/ri';
// import { getSupabaseServiceRole } from '~/lib/supabase';
// import { getUser } from '~/modules/users/users.server';
// import { setupPassword, validatePassword } from '~/services/auth/auth.server';
// import { commitAnySession, commitSession, getSession, requireAuthSession } from '~/services/session.server';
// import { path } from '~/utils/path';

// export async function loader({ request }: LoaderFunctionArgs) {
//   const url = new URL(request.url);
//   const token = url.searchParams.get('token');
//   const type = url.searchParams.get('type');
//   let userId = url.searchParams.get('userId');

//   console.log('password setup', token, type, userId)

//   // Verify the token with Supabase
//   if (!userId || (token || type)) {
//     console.log('userId error')

//     throw redirect(path.to.signup);
//   }

//   try {

//     if (token && type == 'signup') {
//       // throw redirect(path.to.signup);
//       const { data: { user }, error } = await getSupabaseServiceRole().auth.verifyOtp({
//         token_hash: token,
//         type: 'signup'
//       });


//       if (error || !user) {
//         console.log('verifyOtp error')
//         throw redirect(path.to.signup);
//       }

//       userId = user.id
//     }

//     // Store the verified user ID in the session
//     const session = await getSession(request);
//     // session.set('verifiedUserId', user.id);

//     return json(
//       { userId: userId },
//       {
//         headers: {
//           'Set-Cookie': await commitAnySession(session)
//         }
//       }
//     );
//   } catch (error) {
//     console.log('password setup error', error)
//     throw redirect(path.to.signup);
//   }
// }

// export async function action({ request }: ActionFunctionArgs) {
//   const formData = await request.formData();
//   const password = formData.get('password') as string;
//   const confirmPassword = formData.get('confirmPassword') as string;
//   const userId = formData.get('userId') as string;

//   // Get userId from session instead of form data
//   const session = await getSession(request);
//   // const userId = session.get('verifiedUserId');

//   if (!userId) {
//     return json({ error: 'Invalid session. Please try signing up again.' }, { status: 400 });
//   }

//   if (password !== confirmPassword) {
//     return json({ error: 'Passwords do not match' }, { status: 400 });
//   }

//   if (!validatePassword(password)) {
//     return json({
//       error: 'Password must meet all security requirements listed below'
//     }, { status: 400 });
//   }

//   try {
//     await setupPassword(userId, password);

//     const userData = await getUser(getSupabaseServiceRole(), userId)

//     // Sign in the user
//     const { data: { session: authSession }, error } = await getSupabaseServiceRole().auth.signInWithPassword({
//       // Use the email associated with the userId
//       email: userData.data!.email, // Note: You might need to fetch the email from Supabase here
//       password
//     });

//     console.log('signInWithPassword error', error)


//     if (error) throw error;

//     // Clear the verifiedUserId and set the auth session
//     session.unset('verifiedUserId');
//     session.set('authSession', authSession);

//     const authData = await requireAuthSession(request, { verify: true });

//     console.log('authData')

//     redirect(path.to.chooseSubscription)

//     return redirect(path.to.chooseSubscription)

//   } catch (error) {
//     console.log('password setup error', error)
//     return json({ error: error.message }, { status: 400 });
//   }
// }

// export default function SetupPassword() {
//   const actionData = useActionData<typeof action>();
//   const loaderData = useLoaderData<typeof loader>()
//   const navigation = useNavigation();
//   const isSubmitting = navigation.state === 'submitting';
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   console.log('loaderData', loaderData)

//   // Password requirements validation
//   const hasMinLength = password.length >= 8;
//   const hasUpperCase = /[A-Z]/.test(password);
//   const hasLowerCase = /[a-z]/.test(password);
//   const hasNumber = /\d/.test(password);
//   const hasSpecialChar = /[@$!%*?&]/.test(password);
//   const passwordsMatch = password === confirmPassword && password !== '';

//   const renderRequirement = (met: boolean, text: string) => (
//     <div className="flex items-center space-x-2 text-sm">
//       {met ? (
//         <RiCheckLine className="text-green-500" />
//       ) : (
//         <RiCloseLine className="text-red-500" />
//       )}
//       <span className={met ? 'text-green-700' : 'text-gray-600'}>{text}</span>
//     </div>
//   );

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">Set Up Your Password</h1>
//       <p className="mb-6 text-gray-600">
//         Create a strong password for your account. You can use your browser's suggested password
//         or create your own secure password that meets our requirements.
//       </p>

//       <Form method="post" className="space-y-6">
//         <div>
//           <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//             Password
//           </label>
//           <div className="relative">
//             <input
//               type={showPassword ? 'text' : 'password'}
//               id="password"
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               autoComplete="new-password"
//             />
//             {
//               loaderData &&
//               <input type="hidden" name="userId" value={loaderData.userId} />
//             }
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//             >
//               {showPassword ? <RiEyeOffLine size={20} /> : <RiEyeLine size={20} />}
//             </button>
//           </div>
//         </div>

//         <div>
//           <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
//             Confirm Password
//           </label>
//           <div className="relative">
//             <input
//               type={showConfirmPassword ? 'text' : 'password'}
//               id="confirmPassword"
//               name="confirmPassword"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               autoComplete="new-password"
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//             >
//               {showConfirmPassword ? <RiEyeOffLine size={20} /> : <RiEyeLine size={20} />}
//             </button>
//           </div>
//         </div>

//         {actionData?.error && (
//           <div className="p-3 bg-red-50 border border-red-200 rounded-md">
//             <p className="text-sm text-red-600">{actionData.error}</p>
//           </div>
//         )}

//         <div className="bg-gray-50 p-4 rounded-md space-y-2">
//           <p className="text-sm font-medium text-gray-700 mb-2">Password requirements:</p>
//           {renderRequirement(hasMinLength, 'At least 8 characters long')}
//           {renderRequirement(hasUpperCase, 'Contains uppercase letter')}
//           {renderRequirement(hasLowerCase, 'Contains lowercase letter')}
//           {renderRequirement(hasNumber, 'Contains number')}
//           {renderRequirement(hasSpecialChar, 'Contains special character (@$!%*?&)')}
//           {renderRequirement(passwordsMatch, 'Passwords match')}
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting || !hasMinLength || !hasUpperCase || !hasLowerCase ||
//             !hasNumber || !hasSpecialChar || !passwordsMatch}
//           className={`w-full py-3 px-4 text-white rounded-md transition-colors
//             ${isSubmitting || !hasMinLength || !hasUpperCase || !hasLowerCase ||
//               !hasNumber || !hasSpecialChar || !passwordsMatch
//               ? 'bg-blue-300 cursor-not-allowed'
//               : 'bg-blue-600 hover:bg-blue-700'}`}
//         >
//           {isSubmitting ? 'Setting up your password...' : 'Set Password and Continue'}
//         </button>
//       </Form>

//       <div className="mt-6 text-center">
//         <p className="text-sm text-gray-600">
//           Having trouble? <a href="/contact-support" className="text-blue-600 hover:text-blue-700">Contact Support</a>
//         </p>
//       </div>
//     </div>
//   );
// }
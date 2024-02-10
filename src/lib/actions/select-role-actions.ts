'use server';
import { redirect } from 'next/navigation';
import { modifyUser } from '../db/controller/User';

// This extra function is a workaround to Nextjs not liking to use redirect inside try/catch
// and completely ignoring what goes on in them, therefore rendering /undefined urls
// See: https://stackoverflow.com/questions/76191324/next-13-4-error-next-redirect-in-api-routes
const updateUserRole = async (userId: string,
  role: string) => {
  try {
    if (!userId || !role) {
      throw new Error('User or role not found on form');
    }

    const user = await modifyUser(userId, { role });

    if (!user) {
      throw new Error("User role couldn't be updated");
    }

    return user;
  } catch (error) {
    console.log('Error editing data', error);
  }
};

export default async function selectRole (
  userId: string,
  role: string
) {
  const user = await updateUserRole(userId, role);

  if (user && user.role) {
    return redirect(`/${user.role}/dashboard`);
  }
}

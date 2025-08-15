import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import SignUpForm from '@/components/auth/signup-form'
import Logo from '@/components/logo'

export default async function SignUpPage() {
  const session = await getServerSession(authOptions)
  
  if (session) {
    redirect('/overview')
  }

  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col gap-4 p-6 md:p-10 md:pt-6">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  )
}
import { redirect } from 'next/navigation'
import { ROUTES } from '@/constants/routes'

export default function RootPage() {
  // Redirect to marketing page
  redirect('/marketing')
}

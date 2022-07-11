// pages/pages/api/auth.ts
import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '../../utils/supabase';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set the auth cookie.
  supabase.auth.api.setAuthCookie(req, res);
}

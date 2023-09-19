import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
// import { revalidatePath } from 'next/cache';
import { revalidatePath, revalidateTag } from 'next/cache';

import { DEFAULT_WORD_PAGE } from '../../../../constants';
import { DELETE_WORD } from '../../../../queries';
import { getClient } from '../../../../apollo-client';

export async function POST(request: NextRequest) {
  const headersList = headers();
  const referer = headersList.get('referer') || DEFAULT_WORD_PAGE;
  const id = request.nextUrl.searchParams.get('id');
  const client = getClient();

  await client.mutate<{ data: unknown }>({
    mutation: DELETE_WORD,
    variables: { id },
  });
  revalidatePath(referer);
  return NextResponse.redirect(new URL(referer), 303);
}

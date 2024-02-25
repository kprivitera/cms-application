'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { revalidatePath } from 'next/cache';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

import { SEARCH_USERS } from '../../queries';
import { User } from '../../types';
import { get } from 'lodash/fp';
import Button from '../button';

type FormValues = {
  searchTerm: string;
};

const MemberSearch = ({ bookClubId, userId }: { bookClubId: string; userId: number }) => {
  const { register, handleSubmit, watch } = useForm<FormValues>();
  const watchedSearchTerm = watch('searchTerm');

  const onSubmit: SubmitHandler<FormValues> = ({ searchTerm }) => {
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    if (watchedSearchTerm !== searchTerm) {
      setSearchTerm(watchedSearchTerm);
    }
  }, [watchedSearchTerm]);

  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const { data } = useSuspenseQuery(SEARCH_USERS, {
    skip: !searchTerm || searchTerm.length <= 2,
    variables: { currentUserId: userId, searchTerm },
  });

  const users = get('searchUsers', data);
  return (
    <div className="container mr-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col relative h-full	">
        <div className="flex flex-col items-center justify-center relative h-full">
          <input
            {...register('searchTerm')}
            autoComplete="off"
            className="h-full	shadow appearance-none border bg-[#cbcbcb] rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className="absolute h-full top-0 right-[0rem] bg-[#cbcbcb] px-2 text-white font-bold rounded focus:outline-none focus:shadow-outline"
          >
            <img alt="search" width={20} height={20} src="/images/search.svg" />
          </button>
        </div>
      </form>
      <div className="bg-[#2f3349e3] pt-2">
        {users &&
          users.map((user: User) => (
            <div key={user.id} className="flex items-center space-x-4 pl-[0.5rem] py-4 border-[#434947] border-b">
              <div className="w-[3rem] h-[3rem] relative overflow-hidden">
                <img
                  src={`http://localhost:4000/${user.profileImage}`}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="absolute top-0 left-0 min-w-full min-h-full object-cover"
                />
              </div>
              <div>
                <p className="text-[0.75rem] text-gray-500">{`${user.firstName} ${user.lastName}`}</p>
                <form
                  action={`/dashboard/book-clubs/add-member?memberId=${user.id}&bookClubId=${bookClubId}`}
                  method="POST"
                >
                  <Button>Add</Button>
                </form>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MemberSearch;

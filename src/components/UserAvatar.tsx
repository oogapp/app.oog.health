import { User } from "@/gql/graphql"
import classNames from "classnames"

interface UserAvatarProps {
    size?: 'sm' | 'md' | 'lg' | '5xl' | '4xl'
    user: User | null | undefined
}

export default function UserAvatar({ user, size }: UserAvatarProps) {

    console.log("user=", user)
    if (!size) {
        size = "md"
    }

    return (
        <>
            {!user?.profileImage && <div className={classNames("rounded-full border-2 border-gray-900 bg-gray-900", {
                'h-4 w-4': size === 'sm',
                'h-8 w-8': size === 'md',
                'h-16 w-16': size === 'lg',
            })} />}
            {user?.profileImage != null && <img src={`${user.profileImage?.url}w=300`} alt="" className={classNames("rounded-full object-cover border-2 border-gray-900 bg-gray-900", {
                'h-4 w-4': size === 'sm',
                'h-8 w-8': size === 'md',
                'h-12 w-12': size === 'lg',
                'h-24 w-24': size === '4xl',
                'h-32 w-32': size === '5xl',
            })} />}

        </>
    )
}

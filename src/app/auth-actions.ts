'use server'
import { graphql } from '@/gql';
import { CurrentUserQuery, LoginWithOtpMutation, SendOtpMutation, User, VerifyOtpMutation } from '@/gql/graphql';
import { loginFormSchema, otpFormSchema } from '@/lib/schema';
import { GraphQLClient } from 'graphql-request';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


const SendPhoneOTP = graphql(`
    mutation SendOTP($phone:String!) {
        sendPhoneOTP(phone: $phone)
    }
`)

const VerifyOTP = graphql(`
    mutation VerifyOTP($phone:String!,$otp:String!) {
        verifyPhoneOTP(phone: $phone, otp: $otp) {
            token
        }
    }
`)

const LoginWithOTP = graphql(`
    mutation LoginWithOTP($token: String!) {
        login(phoneVerificationToken: $token) {
            token
    user {
        tenants {
        id
        name
        default
        }
    }
        }
    }
`)

const CurrentUser = graphql(`
    query CurrentUser {
        currentUser {
        id
        email
        firstName
        lastName
        role
        limitedRoles
        tenants {
            id
            name
            default
        }
        avatar {
            url
            publicID
        }
        }
    }
`)

const client = new GraphQLClient(process.env.NEXT_PUBLIC_OOG_API_ENDPOINT!)

export async function sendPhoneOTP(prevState:any,data: FormData): Promise<any> {
    let result = loginFormSchema.safeParse({
        phone: data.get('phone')
    })
    if(!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        }
    }
    let resp:SendOtpMutation;
    try {
        resp = await client.request(SendPhoneOTP.toString(), { phone: result.data.phone });
        if(resp.sendPhoneOTP == true)  {
            cookies().set('phone', result.data.phone)
        } else {
            return {
                errors: {
                    phone: 'An error occurred. Please try again.'
                }
            }
        }
    } catch(e) {
        console.error(e)
        return {
            errors: {
                phone: 'An error occurred. Please try again.'
            }
        }
    }
    redirect('/verify')
}

export async function logout() {
    cookies().set('token', '', {
        maxAge: 0
    })
    redirect('/login')
}

export async function currentUser(): Promise<User> {
    let token = cookies().get('token')?.value
    if(!token) {
        return redirect('/login')
    }
    let resp:CurrentUserQuery
    resp = await client.request(CurrentUser.toString(), {},{
        authorization: `Bearer ${token}`
    })
    return resp.currentUser as User
}

export async function verifyPhoneOTP(prevState:any,data: FormData): Promise<any> {
    let phone = cookies().get('phone')?.value
    if(!phone) {
        return redirect('/login')
    }
    let result = otpFormSchema.safeParse({
        otp: data.get('otp'),
    })
    if(!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        }
    }
    let verifyResp:VerifyOtpMutation;
    try {
        verifyResp = await client.request(VerifyOTP.toString(), {
            phone: phone,
            otp: result.data.otp
        });

        let phoneToken = verifyResp.verifyPhoneOTP.token
        let loginResp:LoginWithOtpMutation;
        loginResp = await client.request(LoginWithOTP.toString(), {
            token: phoneToken
        })
        let token = loginResp.login.token
        cookies().delete('phone')
        cookies().set('token', token)
    } catch(e) {
        console.log(e)
        return {
            errors: {
                otp: 'Invalid code, please try again.'
            }
        }
    }
    redirect('/')
}

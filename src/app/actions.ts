'use server'
import { graphql } from '@/gql';
import { SendOtpMutation } from '@/gql/graphql';
import { loginFormSchema } from '@/lib/schema';
import { GraphQLClient } from 'graphql-request';


const SendPhoneOTP = graphql(`
    mutation SendOTP($phone:String!) {
        sendPhoneOTP(phone: $phone)
    }
`)

const client = new GraphQLClient('http://localhost:8081/graphql')

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
    resp = await client.request(SendPhoneOTP.toString(), { phone: result.data.phone });
    return {
        success: resp.sendPhoneOTP
    }
}

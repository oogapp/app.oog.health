'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Poller() {
    const router = useRouter()
    useEffect(() => {
        const interval = setInterval(() => {
            router.refresh()
        }, 1000 * 5)
        return () => {
            clearInterval(interval)
        }
    }, [])
    return (<div></div>)
}

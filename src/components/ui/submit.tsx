import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { Loader2 } from 'lucide-react'
import * as React from "react"
import { useFormStatus } from "react-dom"
import { ButtonProps, buttonVariants } from "./button"

const Submit = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        const { pending } = useFormStatus()
        return (
            <Comp
                className={cn("gap-x-2", buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            >
                {pending && <Loader2 className="animate-spin" />}
                {props.children}
            </Comp>
        )
    }
)
Submit.displayName = "Submit"

export { Submit }


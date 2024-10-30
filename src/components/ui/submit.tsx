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
                <div className="flex items-center justify-center gap-x-4">
                    {pending && <div><Loader2 className="animate-spin" /></div>}
                    <div>{props.children}</div>
                </div>
            </Comp>
        )
    }
)
Submit.displayName = "Submit"

export { Submit }


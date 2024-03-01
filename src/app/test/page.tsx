import TestComponent from "@/components/TestComponent";
import { getTopics } from "../auth-actions";

export default async function TestPage() {

    let data = await getTopics();

    return (
        <div>
            <div>react query test</div>
            <div>
                <TestComponent />
            </div>
        </div>
    )
}

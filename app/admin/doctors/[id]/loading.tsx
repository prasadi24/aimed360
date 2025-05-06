import { MedicalLoader } from "@/components/ui/loader"

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
            <MedicalLoader size={60} />
        </div>
    )
}

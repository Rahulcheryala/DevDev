import BadgesPreview from "./BadgesPreview"
import BadgeControl from "./BadgeControl"


export default function Badges() {
    return (
        <div className="flex  gap-2 w-full">
            <BadgesPreview />
            <BadgeControl />
        </div>
    )
}
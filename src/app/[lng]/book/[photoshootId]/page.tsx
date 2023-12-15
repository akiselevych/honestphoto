//components
import BookSlider from "@/components/BookSlider/BookSlider";

interface Params{
    params: {photoshootId: number}
}
const Page = ({params: {photoshootId}} : Params) => {
    return (
        <>
            <BookSlider typeId={photoshootId}/>
        </>
    );
};

export default Page;

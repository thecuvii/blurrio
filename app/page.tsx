import { Code } from "./Code";
import { Main } from "./Main";

export default function Home() {
 return (
   <>
     <Main />
     {/* <Separator className="max-w-[45dvw] mx-auto my-16" /> */}
     <div className="w-[380px] mx-auto rounded-lg mt-16">
       <Code />
     </div>
   </>
 );
}

import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
export default function Contact() {
    const [result, setResult] = React.useState("");
    const menger = useRef()
    const onSubmit = async (event) => {
        event.preventDefault();
        setInputname('');
        setInputemail('');
        setText('');
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "b7ce34ae-3dd2-4ca8-a76c-351bbca4bc08");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            event.target.reset();
            handlesubmit()
            scd()
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };
    const [shownoti, setshownoti] = useState(false)
    const [notification, setnotification] = useState('')
    const handlesubmit = () => {
        // setnotification('Your Feedback is sent succesfully');
        setnotification(toast.info(`${inputname}, Your Feedback is sent succesfully`, { theme: 'dark' }))
        setshownoti(true);

        // Set a timeout to hide the notification after 2 seconds
        setTimeout(() => {
            setshownoti(false);
        }, 4000);
    };
    console.log(result)
    const inpnam = useRef(null)
    const [namee, setnamee] = useState('')
    const inpe = (e) => {
        e.preventDefault()
        setnamee(e.target.value)

    }
    const scd = () => {
        setnamee('')
    }
    const [text, setText] = useState('');

    const handleInput = (e) => {
        const textarea = e.target;

        // Reset height to auto to shrink the textarea if the content is deleted
        textarea.style.height = 'auto';

        // Set height to scrollHeight to dynamically adjust based on content
        textarea.style.height = textarea.scrollHeight + 'px';

        setText(textarea.value);
    }
    const [inputemail, setInputemail] = useState("");
    const handleinputemailchange = (e) => {
        const value = e.target.value
        setInputemail(value)

    }
    const [inputname, setInputname] = useState("");
    const handleinputuserchange = (e) => {
        const value = e.target.value
        setInputname(value)

    }
    return (
        <div id="contact" >
            <form onSubmit={onSubmit} className="formback backdrop-blur-md rounded-xl">
                <div className='flex justify-center items-center m-3 flex-wrap gap-3'  >


                    <div className='border-2 border-zinc-700 rounded-md relative group pt-4  pb-2 focus-within:border-sky-600 p-1 flex items-center justify-center flex-col w-full my-2' >
                        <div className='flex items-center justify-end  w-full' >
                            <p className={`text-zinc-600 absolute bottom-0  left-2 pointer-events-none select-none transition-all duration-200 group-focus-within:top-0 group-focus-within:text-sky-700 group-focus-within:text-sm opacity-100 ${inputname ? "top-0 text-sm group-focus-within:text-sky-700 opacity-100" : "top-[10px] text-lg opacity-0"}`} >Name</p>
                            <p className=' text-zinc-500 text-sm hidden group-focus-within:block absolute top-0' > {inputname.length} / 50 </p>
                        </div>

                        <input value={inputname} onChange={handleinputuserchange} className='w-full px-2 text-lg text-white rounded-md bg-transparent  outline-none border-none ' maxLength={50} required type="text" name="name" />
                    </div>

                    <div className='border-2 border-zinc-700 rounded-md relative group pt-4  pb-2  w-full focus-within:border-sky-600 p-1 flex items-center justify-center flex-col' >
                        <div className='flex items-center justify-end  w-full' >
                            <p className={`text-zinc-600 absolute bottom-0  left-2 pointer-events-none select-none transition-all duration-200 group-focus-within:top-0 group-focus-within:text-sky-700 group-focus-within:text-sm opacity-100 ${inputemail ? "top-0 text-sm group-focus-within:text-sky-700 opacity-100" : "top-[10px] text-lg opacity-0"}`} >Email</p>

                        </div>

                        <input name="email" value={inputemail} onChange={handleinputemailchange} className='w-full px-2 text-lg text-white rounded-md bg-transparent  outline-none border-none ' required type="email" />
                    </div>

                </div>
                <div className='m-4' >
                    <div className="subbut flex items-center justify-center w-full" >
                        <textarea onInput={handleInput}
                            style={{ height: 'auto', minHeight: '40px' }}
                            value={text} className='w-full bg-transparent text-white text-xl p-2 border-zinc-700 border-2 placeholder:text-zinc-600  outline-none rounded-xl overflow-y-hidden placeholder-slate-300 backdrop-blur-sm resize-none focus-within:border-sky-700' placeholder='Write your Thoughts!' name="message" required></textarea>

                    </div>

                </div>

                {shownoti && (
                    <div ref={menger} className="noter fixed top-32 right-1 w-auto h-8 bg-white z-50  items-center justify-center p-2 rounded-md shadow-md border-b-4border-l-4  hidden">
                        <h1>{notification}</h1>
                    </div>
                )}

                <div className="subbut flex items-center justify-center w-full">
                    <button type="submit" className="outline-none border-none w-3/4" ><p className=' text-white w-auto text-lg  border border-grey-100  p-2 pl-5 pr-5 cursor-pointer transition-all duration-700 overflow-hidden z-10  prasub font-semibold text-nowrap hover:bg-sky-600 rounded-xl bg-sky-800  shadow-xl backdrop-blur-sm ' >Submit

                    </p></button>
                </div>

            </form>


        </div>
    );
}
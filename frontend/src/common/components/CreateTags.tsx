import React, { useEffect, useRef, useState } from "react";
import TextInput from "../ui/TextInput";
import { useForm } from 'react-hook-form'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { CREATE_TAG_REQUEST, fetchTagRequest } from "../actions/tagActions";
import { createTaskRequest } from "../actions/taskActions";



const tagSchema = z.object({
    tag_name: z.string().min(1)
})

type TagValues = z.infer<typeof tagSchema>

const CreateTags: React.FC = () => {

    const { handleSubmit, control, watch, formState: { errors } } = useForm<TagValues>({
        resolver: zodResolver(tagSchema)
    })
    const dispatch = useDispatch();
    const tagnameValue = watch("tag_name")
    const [isFocused, setIsFocused] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const tags = useSelector((s: any) => s.tags.tags)
    console.log('tagsfe', tags)

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsFocused(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        dispatch(fetchTagRequest())
    }, [])

    const createTaskHandler = (data: TagValues) => {
        dispatch(CREATE_TAG_REQUEST(data))
    }

    //bg-gradient-to-r from-slate-200 to-slate-100
    return (
        <>
            <form onSubmit={handleSubmit(createTaskHandler)}>
                <div className="relative">
                    <TextInput
                        placeholderProp="Type a tag"
                        nameProp="tag_name"
                        controlProp={control}
                        onFocus={handleFocus}
                    // onBlur={handleBlur}
                    />
                    {/* dropdown div */}
                    {isFocused &&
                        <div
                            ref={dropdownRef}
                            className="container absolute top-11 py-1 rounded-sm shadow-sm drop-shadow-sm border border-grey-100 bg-[#ffffff] max-h-60 overflow-y-scroll "
                            onClick={handleFocus}
                        >
                            {/* create Tag Div */}
                            {
                                tagnameValue &&

                                <div className="flex justify-between bg-white px-2 py-1 rounded-sm hover:bg-gradient-to-r from-green-400 to-emerald-300 hover:text-white">
                                    {/* {
                                        tags.map((tag: any) => {
                                            if(tag.tag_name == tagnameValue ){
                                               return (
                                                    <>
                                                        <p>{tag.tag_name}</p>
                                                        <input
                                                            type="checkbox"
                                                            className="mr-1"
                                                        />
                                                    </>
                                                ) 
                                            }else{
                                               return (
                                                    <>
                                                        <p >{tagnameValue}</p>
                                                        <button type="submit" >
                                                            <AddIcon className="hover:bg-white text-black rounded-lg " />
                                                        </button>
                                                    </>
                                                )
                                            }
                                        })
                                    } */}

                                    {
                                        tags.map((tag: any) => {
                                            if (tag.tag_name === tagnameValue) {
                                                // If tag with the same name exists, render it
                                                return (
                                                    <>
                                                        <p>{tag.tag_name}</p>
                                                        <input
                                                            type="checkbox"
                                                            className="mr-1"
                                                        />
                                                    </>
                                                );
                                            }
                                        })
                                    }
                                    {/* If tag with the same name doesn't exist, render the create tag option */}
                                    {!tags.some((tag: any) => tag.tag_name === tagnameValue) && tagnameValue && (
                                        <>
                                            <p >{tagnameValue}</p>
                                            <button type="submit" >
                                                <AddIcon className="hover:bg-white text-black rounded-lg " />
                                            </button>
                                        </>
                                    )}

                                </div>

                            }
                            <hr className="border-b border-black-500" />
                            {/* displayTags div */}
                            {!tagnameValue &&
                                tags.map((tag: any) => (
                                    <>
                                        <div key={tag._id} className="flex justify-between bg-white px-2 py-1 rounded-sm hover:bg-gradient-to-r from-green-400 to-emerald-300 hover:text-white">
                                            <p>{tag.tag_name}</p>
                                            <input
                                                type="checkbox"
                                                className="mr-1"
                                            />
                                        </div>
                                        <hr className="border-b border-black-500" />
                                    </>

                                ))

                            }
                        </div>}
                </div>
            </form>
        </>

    );
}

export default CreateTags;
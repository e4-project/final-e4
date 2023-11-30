import style from '@/styles/style.module.css';
import React, { useState, useRef } from 'react';


export default function Coment ({onCreate}:any){
        const [content, setContent] = useState("");
        const inputRef = useRef<any>(null);
    
        const onChange = (event:any)=>{
            setContent(event.target.value);
        }
        const onSubmit = ()=>{
            inputRef.current.focus();
            if(!content){ return; }
            onCreate(content);
            setContent("");
        }

    return(
        <div className={style.comment}>
            <span>댓글</span>
            <textarea ref={inputRef}
                onChange={onChange}
                value={content}
                placeholder="댓글 달기"></textarea>
            <button onClick={onSubmit}>등록</button>
        </div>

    )
}
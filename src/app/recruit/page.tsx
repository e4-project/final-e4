"use client";
import style from '@/styles/style.module.css';
import { useState, useRef } from 'react';
import Modal from '@/components/common/modal/page';
import Dummy from "@/dummy/data.json";
import Coment from '@/components/coment/ComentEditer';
import ComentList from '@/components/coment/ComentList';


const coment_data:any = []

export default function Studypage(){
    const [modalOpen, setModalOpen] = useState(false);

    const showModal = ()=>{
        setModalOpen(true);
    };

    const [coment, setComent] = useState(coment_data);
    const idRef = useRef(3);
    const onCreate = (content:any)=>{
        const newComent = {
            id: idRef.current, isDone:false, content, createdDate: new Date().getTime()
        }
        setComent([newComent, ...coment]);
        idRef.current += 1;
        console.log(coment);
        
    }
    const onUpdate = (id:any)=>{
        setComent(coment.map((coment:any)=>coment.id === id? {...coment, isDone: !coment.isDone} : coment))
    };
    const onDelete = (id:any)=>{
        setComent(coment.filter((coment:any)=> coment.id !== id))
    }
    
    return(
        <div className={style.sheet}>
            {modalOpen && <Modal setModalOpen={setModalOpen}/>}
            <div className={style.style}>
                {/*  */}
                <div className={style.area1}>
                    <ul className={style.area1_sheet}>
                        <li className={style.list}>
                            {Dummy.tag.map(tag => (
                                <p key={tag.id}>
                                    {tag.name}
                                </p>
                            ))}
                        </li>
                        <li className={style.list}>
                            {Dummy.form.map(form =>(
                                <span key={form.id}>{form.name}</span>
                            ))}
                        </li>
                        <li className={style.list}>
                            {Dummy.title.map(title =>(
                                <h2 key={title.id}>{title.name}</h2>
                            ))}
                        </li>
                        <li className={style.list}>
                            <button><a href="">교재 정보 <img src="/Vector 63.png" alt="" /></a></button>
                        </li>
                        <li className={style.list}>
                            <span>
                                스터디 기간 {Dummy.period.map(period =>(
                                    <span key={period.id}>{period.name}</span>
                                ))}
                            </span>
                        </li>
                        <li className={style.list}>
                            <span>
                                모집 인원
                            </span>
                        </li>
                        <li className={style.list}>
                            <div className={style.buttonarea}>
                                <p>모집 마감</p>
                                <button className={style.application_button} onClick={showModal}>스터디 참여 신청</button>
                                <button className={style.good}>좋아요<img src="/Union.png" alt="" /></button>
                            </div>
                        </li>
                    </ul>
                </div>
                {/*  */}
                <div className={style.area2}>
                    <div className={style.study_title}>
                        {Dummy.study_title.map(study_title =>(
                            <h2 key={study_title.id}>{study_title.name}</h2>
                        ))}
                        {Dummy.study_text.map(study_text =>(
                            <p key={study_text.id}>{study_text.name}</p>
                        ))}
                    </div>
                    <div className={style.comment}>
                        <Coment onCreate={onCreate}/>
                        <ComentList coment={coment}
                            onUpdate={onUpdate}
                            onDelete={onDelete}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
import style from '@/styles/style.module.css'


export default function ComentItem ({id, content, createdDate, onDelete}:any){
    const onClickDelete = ()=>{ onDelete(id); }

    return(
        <div className={style.coment_sheet}>
            <div className={style.coment_frame}>
                <div className={style.coment_profile_box}>
                    <div className={style.coment_profile}></div>
                    <div>
                        <p>이름이야요</p>
                        <span> {new Date(createdDate).toLocaleDateString()} </span>
                    </div>
                </div>
                <div className={style.coment_button_box}>
                    <button className={style.delete}>수정</button>
                    <button className={style.delete} onClick={onClickDelete}>삭제</button>
                </div>
            </div>
            <p className={style.coment}>{content}</p>
        </div>
    )
}
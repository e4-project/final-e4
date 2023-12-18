import style from "../boardPost.module.css"
import Button from "@/components/common/Button";

interface Iprops {
    _id:string
    onDelPost: (id: string) => void;
}

export default function ExpansionButton ({_id, onDelPost}:Iprops){
    return(
        <>
        <input className={style.check} type="checkbox" name={_id} id={_id} />
            <label className={style.check_label} htmlFor={_id}>
              <img src="/icons/icon_dot3.svg" alt="" />
              <div className={style.expansion_box}>
                <Button text="수정" className={style.post_btn} />
                <Button
                  text="삭제"
                  className={`${style.post_btn} ${style.btn_del}`}
                  onClick={() => onDelPost(_id)}
                />
              </div>
            </label>
        </>
    )
}
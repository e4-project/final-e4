import style from "../boardPost.module.css"

export default function LikeButton ({_id}:{_id:string}){
    return(
        <div className={style.post_reaction}>
          <input className={style.like_check} type="checkbox" name={_id} id={_id} />
          <label className={style.like_label} htmlFor={_id}>
            <div className={style.like}>
              좋아요
              <img className={style.like_img} src="/icons/Union.png" alt="" />
            </div>
          </label>
        </div>
    )
}
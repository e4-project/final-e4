import { useState } from 'react';
import ComentItem from './ComentItem';

export default function ComentList({coment, onUpdate, onDelete}:any){
    const [search, setSearch] = useState("");
   

    const filteringComent = ()=>{
        return search === "" ? coment: 
        coment.filter( (coment:any)=> coment.content.toLowerCase().includes(search.toLowerCase()) );
    }

    return(
        <div>
            {filteringComent().map((coment:any)=>(
                <ComentItem key={coment.id} {...coment} onUpdate={onUpdate} onDelete={onDelete}/>
            ))}
        </div>
    )
}
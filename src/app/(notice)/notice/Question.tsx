import React, {Dispatch,useState} from "react";
import styles from "./page.module.css"
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";


interface IProps {
    crdate: string;
    title: string;
    info: string;
    id : number;


    setIndex:Dispatch<React.SetStateAction<number>>;
    index:number;
}

const Question = ({ crdate,title,info,id,setIndex,index}: IProps) => {
    const [toggle, setToggle] = useState<boolean>(false);
    
    const onClickShow = (id:number) => {
        
        if(id === index){
            setToggle(false);
            setIndex(-1);
        }else{
            setToggle(true);
            setIndex(id);
        }
    };
    return(
        <article className="question">
            
                <h4></h4>
                <div className={styles.noticeDiv} onClick={() => onClickShow(id)}>
					<div className={styles.noticeQ}>Q</div>
					<div className={styles.noticeTitle} >{title}</div>
					<div className={styles.noticeSysdate}>{crdate}</div>
                    <div className={styles.noticeIc}>
                    {id === index ?
                    <IoIosArrowUp/>: <IoIosArrowDown /> 
                    }
                    </div>
                </div>

            
            {id === index && <div className={styles.noticeContent}><p className={styles.noticeContentDetail}>{info}</p></div>}
        </article>
    );
};

export default Question;
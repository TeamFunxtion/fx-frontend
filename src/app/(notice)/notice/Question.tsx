// import React, {Dispatch,useState} from "react";
// import styles from "./page.module.css"
// import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
// // processData 함수를 호출하여 데이터를 처리합니다.

// interface IProps {
//     crdate: string;
//     title: string;
//     info: string;
//     id : number;


//     setIndex:Dispatch<React.SetStateAction<number>>;
//     index:number;
// }

// export default async function Question({ crdate,title,info,id,setIndex,index}: IProps) {
//     const [toggle, setToggle] = useState<boolean>(false);
    

//     const onClickShow = (id:number) => {
        
//         if(id === index){
//             setToggle(false);
//             setIndex(-1);
//         }else{
//             setToggle(true);
//             setIndex(id);
//         }
//     };
//     return(
//     <article className="question">
            
//     <h4></h4>
//     <div className={styles.noticeDiv} onClick={() => onClickShow(id)}>
//         <div className={styles.noticeQ}>Q</div>
//         <div className={styles.noticeTitle} >{title}</div>
//         <div className={styles.noticeSysdate}>{crdate}</div>
//         <div className={styles.noticeIc}>
//         {id === index ?
//         <IoIosArrowUp/>: <IoIosArrowDown /> 
//         }
//         </div>
//     </div>


// {id === index && <div className={styles.noticeContent}><p className={styles.noticeContentDetail}>content}</p></div>}
// </article>
//     );
// };
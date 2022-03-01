import { useForm, Controller } from "react-hook-form";
import Container from '@material-ui/core/Container';
import Input from "@material-ui/core/Input";
import  firebase  from '../config/firebase';


export default function Home() {
  const { register, handleSubmit, formState: { errors }, control, watch } = useForm();

  const onSubmit = (data) => {
    firebase.firestore().collection('answers').add({
      name: data.name,
      birth: data.birth,
      isLearning: data.isLearning,
      wasLearning: data.wasLearning,
      allLanguage: data.allLanguage
    })

  };

  return (
    <>
      <Container>
        <h1>プログラミング学習に関するアンケート</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Q1.名前を入力してください(匿名可)</label>
            <Controller name="name"
              defaultValue=""
              control={control}
              render={({ field: { value, onChange } }) => <Input value={value} onChange={onChange} />}
            />
          </div>
          <div>
            <label htmlFor="birth">Q2.生年月日を入力してください(例: 19900101)</label>
            <Controller
              name="birth"
              defaultValue=""
              control={control}
              rules={{ required: true, pattern: /^[0-9]{8}$/ }}
              render={({ field: { value, onChange } }) => <Input value={value} onChange={onChange} />}
            />
            {
              errors.birth && errors.birth.type === "required" ?
                <span>※このフィールドは回答必須です。</span> : null
            }
            {
              errors.birth && errors.birth.type === "pattern" ?
                <span>※整数8桁で入力してください。</span> : null
            }
          </div>
          <div>
            <label htmlFor="nowStudy">Q3.現在、プログラミングを学習していますか？</label>
            <input type="radio" name="isLearning" {...register("isLearning", { required: true })} value="yes" />はい
            <input type="radio" name="isLearning" {...register("isLearning", { required: true })} value="no" />いいえ
            <input type="radio" name="isLearning" {...register("isLearning", { required: true })} value="unknow" />わからない
            {
              errors.isLearning &&
              <span>※このフィールドは回答必須です。</span>
            }
          </div>
          <div>
            <label htmlFor="postStudy">Q4.これまでに、プログラミングを学習したことはありませか？</label>
            <input type="radio" name="wasLearning" {...register("wasLearning", { required: true })} value="yes" />はい
            <input type="radio" name="wasLearning" {...register("wasLearning", { required: true })} value="no" />いいえ
            <input type="radio" name="wasLearning" {...register("wasLearning", { required: true })} value="unknow" />わからない
            {
              errors.wasLearning &&
              <span>※このフィールドは回答必須です。</span>
            }
          </div>
          {(watch("isLearning") === "yes" || watch("wasLearning") === "yes") &&
            <div>
              <label htmlFor="allLanguage">Q5.今まで学習したことのあるプログラミング言語を全て教えてください</label>
              <Controller name="allLanguage"
                defaultValue=""
                control={control}
                render={({ field: { value, onChange } }) => <Input value={value} onChange={onChange} />}
              />
            </div>
          }
          <input type="submit" value="アンケートを提出する" />
        </form>
      </Container>
    </>
  )
}

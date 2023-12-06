import { fetchAnalytic } from "@/components/entities/analytics/model/actions/analytic";
import { fetchMyAnalytic } from "@/components/entities/analytics/model/actions/myAnalytic";
import { fetchMyQuizResults } from "@/components/entities/analytics/model/actions/myQuizResults";
import { fetchUserQuizResults } from "@/components/entities/analytics/model/actions/userQuizResults";
import { fetchAllCourses } from "@/components/entities/education/model/actions/allCourses";
import { fetchLecture } from "@/components/entities/education/model/actions/lecture";
import { fetchQuiz } from "@/components/entities/education/model/actions/quiz";
import { fetchQuizResults } from "@/components/entities/education/model/actions/quizResults";
import { fetchReadLecture } from "@/components/entities/education/model/actions/readLecture";
import { fetchConfirm } from "@/components/entities/globalAPI/confirm";
import { fetchReject } from "@/components/entities/globalAPI/reject";
import { fetchUpdateRole } from "@/components/entities/globalAPI/updateRole";
import { fetchLogout } from "@/components/entities/welcome/model/actions/logout";
import { fetchProfile } from "@/components/entities/welcome/model/actions/profile";
import { fetchRegistration } from "@/components/entities/welcome/model/actions/registration";
import { fetchSignIn } from "@/components/entities/welcome/model/actions/signIn";
import { useAppDispatch } from "@/providers/storeProvider";

const questionsExample = [
	{
		question_id: 519,
		choices: [
			{
				id: 774,
			},
		],
	},
];

const TestRoutes = (): JSX.Element => {
	const dispatch = useAppDispatch();

	return (
		<div className="flex flex-col gap-[20px]">
			<button
				onClick={() => {
					dispatch(fetchProfile());
				}}
				className="border-2 border-red-400"
				type="button"
			>
				<p>fetchProfile</p>
				<p>Получение профиля</p>
			</button>

			<button
				onClick={() => {
					// dispatch();
				}}
				className="border-2 border-red-400"
				type="button"
			>
				{/* <p>fetchConfirm</p> */}
				<p>Принять стажёра на работу</p>
			</button>

			<button
				onClick={() => {
					// dispatch();
				}}
				className="border-2 border-red-400"
				type="button"
			>
				{/* <p>fetchReject</p> */}
				<p>Отказать стажёру в работе</p>
			</button>

			<button
				onClick={() => {
					dispatch(fetchUpdateRole({ bitrix_id: 212609, role: 1 }));
				}}
				className="border-2 border-red-400"
				type="button"
			>
				<p>fetchUpdateRole</p>
				<p>Обновить роль пользователя</p>
			</button>

			<button
				onClick={() => {
					dispatch(fetchConfirm({ id: 10, department_id: "335" }));
				}}
				className="border-2 border-red-400"
				type="button"
			>
				<p>fetchConfirm</p>
				<p>Принять заявку пользователя</p>
			</button>

			<button
				onClick={() => {
					dispatch(fetchReject({ id: 1000 }));
				}}
				className="border-2 border-red-400"
				type="button"
			>
				<p>fetchReject</p>
				<p>Отклонить заявку пользователя</p>
			</button>

			<button
				onClick={() => {
					dispatch(fetchAllCourses({ jobTitle: 1 }));
				}}
				className="border-2 border-red-400"
				type="button"
			>
				<p>fetchAllCourses</p>
				<p>Получение всех курсов</p>
			</button>

			<button
				onClick={() => {
					dispatch(fetchLecture({ course_id: 73 }));
				}}
				className="border-2 border-red-400"
				type="button"
			>
				<p>fetchLecture</p>
				<p>Получение лекции</p>
			</button>

			<button
				onClick={() => {
					dispatch(fetchReadLecture({ translation_id: 123 }));
				}}
				className="border-2 border-red-400"
				type="button"
			>
				<p>fetchReadLecture</p>
				<p>Прочтение лекции</p>
			</button>

			<button
				onClick={() => {
					dispatch(fetchQuiz({ quiz_id: 27 }));
				}}
				className="border-2 border-red-400"
				type="button"
			>
				<p>fetchQuiz</p>
				<p>Получение теста</p>
			</button>

			<button
				onClick={() => {
					dispatch(
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						fetchQuizResults({ quiz_id: 76, questions: questionsExample })
					);
				}}
				className="border-2 border-red-400"
				type="button"
			>
				<p>fetchQuizResults</p>
				<p>Получение результатов теста</p>
			</button>

			<button
				onClick={() => {
					dispatch(fetchUserQuizResults({ quiz_id: 76 }));
				}}
				className="border-2 border-red-400"
				type="button"
			>
				<p>fetchUserQuizResults</p>
				<p>Получение аналитики теста пользователя</p>
			</button>

			<button
				onClick={() => {
					dispatch(fetchMyQuizResults({ quiz_id: 76 }));
				}}
				className="border-2 border-red-400"
				type="button"
			>
				<p>fetchMyQuizResults</p>
				<p>Получение аналитики теста ТЕКУЩЕГО пользователя</p>
			</button>

			<button
				onClick={() => {
					dispatch(fetchAnalytic({ user_id: 212609 }));
				}}
				className="border-2 border-red-400"
				type="button"
			>
				<p>fetchAnalytic</p>
				<p>Получение аналитики</p>
			</button>

			<button
				onClick={() => {
					dispatch(fetchMyAnalytic());
				}}
				className="border-2 border-red-400"
				type="button"
			>
				<p>fetchMyAnalytic</p>
				<p>Получение аналитики ТЕКУЩЕГО пользователя</p>
			</button>

			<button
				onClick={() => {
					dispatch(
						fetchSignIn({
							login: "A.Admin_52@corp.lichi.com",
							password: "wTzliO1Zd",
						})
					);
				}}
				className="border-2 border-red-400"
				type="button"
			>
				<p>fetchSignIn</p>
				<p>Вход</p>
			</button>

			<button
				onClick={() => {
					dispatch(fetchLogout());
				}}
				className="border-2 border-red-400"
				type="button"
			>
				<p>fetchLogout</p>
				<p>Выход</p>
			</button>

			<button
				onClick={() => {
					dispatch(
						fetchRegistration({
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-ignore
							firstLayout: {
								name: "test",
								lastname: "test",
								middlename: "test",
								birthday: new Date("2000-06-11"),
								job_id: "2",
								shop_id: 1,
							},
							secondLayout: {
								phone: "+7891154367",
								email: "wefwef@mail.ru",
								password: "Qwerty123",
							},
						})
					);
				}}
				className="border-2 border-red-400"
				type="button"
			>
				<p>fetchRegistration</p>
				<p>Регистрация</p>
			</button>
		</div>
	);
};

export default TestRoutes;

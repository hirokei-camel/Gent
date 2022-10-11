import { ChangeEventHandler, ChangeEvent, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTask } from '../../hooks/useTask';
import { useReactiveVar } from '@apollo/client';
import {
  createTaskModalState,
  initStateOfTaskModal,
} from '../../context/taskState';
import { useRouter } from 'next/router';

const CreateTaskModal = (): JSX.Element | null => {
  const router = useRouter();
  const createTaskModal = useReactiveVar(createTaskModalState);
  const [inputTaskName, setInputTaskName] = useState<string>('');
  const handleChangeTextArea: ChangeEventHandler<HTMLElement> = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setInputTaskName(event.target.value);
  };

  const { createTask } = useTask(createTaskModal.storyId, 'new');
  if (!createTaskModal.isOpen) {
    return null;
  }
  return (
    <div
      className="flex justify-center items-center overflow-auto fixed inset-0 m-auto bg-black1 bg-opacity-20 backdrop-blur-md z-20"
      onClick={() => {
        setInputTaskName('');
        createTaskModalState(initStateOfTaskModal);
      }}
    >
      <div
        className="bg-white h-256 w-410 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mt-32 ml-38 text-xl">タスクの追加</h2>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              const {
                data: {
                  createTask: { success, message },
                },
              } = await createTask(inputTaskName, createTaskModal.storyId);
              if (success) {
                toast.success(message);
              }
              setInputTaskName('');
              createTaskModalState(initStateOfTaskModal);
            } catch (error: any) {
              toast.error('セッションの有効期限が切れています');
              router.push('/signin');
            }
          }}
        >
          <textarea
            className="block mx-auto my-22 p-5 border border-black3 rounded-2xl w-4/5 h-128 resize-none"
            onChange={handleChangeTextArea}
            value={inputTaskName}
          ></textarea>
          <div className="text-right bg-black3 w-full rounded-b-2xl py-16">
            <button
              className="mr-16 bg-black3 w-102 py-3 text-black2"
              onClick={() => {
                setInputTaskName('');
                createTaskModalState(initStateOfTaskModal);
              }}
            >
              キャンセル
            </button>
            <button className="bg-blue1 w-128 mr-16 py-3 rounded-xl text-white">
              作成
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;

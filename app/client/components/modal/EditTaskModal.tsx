import { useState, ChangeEvent, ChangeEventHandler, useEffect } from 'react';
import { Trash2 } from 'react-feather';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTask } from '../../hooks/useTask';
import { useReactiveVar } from '@apollo/client';
import {
  editTaskModalState,
  initStateOfEditTaskModal,
} from '../../context/taskState';
import { useRouter } from 'next/router';

const EditTaskModal = (): JSX.Element | null => {
  const router = useRouter();
  const editTaskModal = useReactiveVar(editTaskModalState);
  useEffect(() => {
    setConsideredTaskName(editTaskModal.name);
  }, [editTaskModal.name]);
  const [consideredTaskName, setConsideredTaskName] = useState<string>(
    editTaskModal.name
  );
  const { renameTask, deleteTask } = useTask(
    editTaskModal.storyId,
    editTaskModal.status
  );
  const handleTaskNameChanged: ChangeEventHandler<HTMLElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConsideredTaskName(event.target.value);
  };
  if (!editTaskModal.isOpen) {
    return null;
  }
  return (
    <div
      className="flex justify-center items-center overflow-auto fixed inset-0 m-auto bg-black1 bg-opacity-20 backdrop-blur-md z-20"
      onClick={() => {
        editTaskModalState(initStateOfEditTaskModal);
      }}
    >
      <div
        className="bg-white h-256 w-410 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mt-32 ml-38 text-xl"> タスクの編集</h2>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const {
              data: {
                renameTask: { success, message },
              },
            } = await renameTask(editTaskModal.id, consideredTaskName);
            if (success) {
              toast.success(message);
            }
            editTaskModalState(initStateOfEditTaskModal);
          }}
        >
          <textarea
            className="block mx-auto my-22 p-5 border border-black3 rounded-2xl w-4/5 h-128 resize-none"
            onChange={handleTaskNameChanged}
            value={consideredTaskName}
          ></textarea>
          <div className="relative text-right bg-black3 mt-16 w-full rounded-b-2xl py-16">
            <Trash2
              strokeWidth={1}
              className="absolute inline left-16 top-19"
              onClick={async (event) => {
                event.preventDefault();
                try {
                  const {
                    data: {
                      deleteTask: { success, message },
                    },
                  } = await deleteTask(editTaskModal.id);
                  if (success) {
                    toast.success(message);
                  }
                  editTaskModalState(initStateOfEditTaskModal);
                } catch (error) {
                  toast.error('セッションの有効期限が切れました');
                  router.push('/signin');
                }
              }}
            />
            <button
              className="mr-16 bg-black3 w-102 py-3 text-black2"
              onClick={() => {
                editTaskModalState(initStateOfEditTaskModal);
              }}
            >
              キャンセル
            </button>
            <button className="bg-green1 w-128 mr-16 py-3 rounded-xl text-white">
              完了
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;

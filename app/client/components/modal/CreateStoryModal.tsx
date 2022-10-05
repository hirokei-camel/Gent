import { useMutation } from '@apollo/client';
import { ChangeEventHandler, ChangeEvent, useState } from 'react';
import { GET_STORIES } from '../../query/story/getStories';
import MAKE_STORY from '../../query/story/makeStory';
import { StoryModalArgsType } from '../../types/StoryModalArgsType';

const CreateStoryModal = ({
  isOpen,
  onClose,
}: StoryModalArgsType): JSX.Element | null => {
  const [makeStory] = useMutation(MAKE_STORY, {
    refetchQueries: [{ query: GET_STORIES }, 'getStories'],
  });
  const [inputStoryName, setInputStoryName] = useState<string>('');
  const handleChangeTextArea: ChangeEventHandler<HTMLElement> = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setInputStoryName(event.target.value);
  };
  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <div
        className="flex justify-center items-center overflow-auto fixed inset-0 m-auto bg-black1 bg-opacity-20 backdrop-blur-md z-20"
        onClick={onClose}
      >
        {/* Todo: Add new custom margin and width value to tailwind.config.js not use [] */}
        <div
          className="bg-white h-256 w-410 rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="mt-32 ml-38 text-xl">ストーリーの新規作成</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              makeStory({ variables: { name: inputStoryName } });
              onClose();
            }}
          >
            {/* Todo: Arrange textarea input values font-size, padding, ... */}
            <textarea
              className="block mx-auto my-22 border border-black3 rounded-2xl w-4/5 h-128 resize-none"
              onChange={handleChangeTextArea}
              value={inputStoryName}
            ></textarea>
            <div className="text-right bg-black3 mt-16 w-full rounded-b-2xl py-16">
              <button
                className="mr-16 bg-black3 w-102 py-3 text-black2"
                onClick={onClose}
              >
                キャンセル
              </button>
              <input
                className="bg-blue1 w-128 mr-16 py-3 rounded-xl text-white"
                type="submit"
                value="作成"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateStoryModal;

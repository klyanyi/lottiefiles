import * as React from 'react';

import Icon from '../Icon/Icon';
import { searchQuery } from '../../recoil/atom';
import { useSetRecoilState } from 'recoil';

const SearchInput = function () {
  const [inputValue, setInputValue] = React.useState('');

  const setRecoilState = useSetRecoilState(searchQuery);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setRecoilState(inputValue || '');
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="lf-input-container">
      <Icon icon="search" fillColor="rgb(24, 200, 202)" />
      <input
        type="text"
        placeholder="Search..."
        value={inputValue}
        onKeyPress={handleKeyPress}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;

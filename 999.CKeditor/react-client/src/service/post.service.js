export const getMainPosts = async () => {
  try {
    const response = await fetch("/posts/get");
    const result = await response.json();
    // noticeList, freeList, boardList
    return result;
  } catch (err) {
    return null;
  }
};

export const getBoardPosts = async (bEng) => {
  try {
    const response = await fetch(`/board/${bEng}/get`);
    const result = await response.json();
    // board, data;
    return result;
  } catch (err) {
    return null;
  }
};

export const getDetailPost = async (pCode) => {
  try {
    const response = await fetch(`/post/${pCode}/get`);
    const result = await response.json();
    // post, board
    if (result.ERROR) {
      alert(result.ERROR);
      return result;
    }
    return result;
  } catch (err) {
    return null;
  }
};

export const submitPost = async (data, pCode = null) => {
  // 본문에서 thumbnail 경로를 추출해 별도의 칼럼에 저장하는 방식은 좋지 않다...
  // const content = item?.b_content;
  // let imgSrc = "";
  // if (content) {
  //   const imgStartIdx = content.indexOf("![](");
  //   if (imgStartIdx > -1) {
  //     const imgLastIdx = item?.b_content.indexOf(")", imgStartIdx);
  //     imgSrc = item?.b_content.slice(imgStartIdx + 4, imgLastIdx);
  //   }
  // }

  const fetchOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  try {
    let response;
    // insert
    if (!pCode) {
      response = await fetch("/post/insert", fetchOption);
    }
    // update
    if (pCode) {
      fetchOption.method = "PATCH";
      response = await fetch("/post/update", fetchOption);
    }
    const result = await response.json();
    if (result.ERROR) {
      alert(result.ERROR);
      return null;
    }
    alert(result.MESSAGE);
    return result;
  } catch (err) {
    return null;
  }
};

export const deletePost = async (pCode) => {
  if (window.confirm("이 게시글을 삭제하시겠습니까?"))
    try {
      const response = await fetch(`/post/${pCode}/delete`);
      const result = await response.json();
      if (result.ERROR) {
        alert(result.ERROR);
        return null;
      }
      alert(result.MESSAGE);
      return result;
    } catch (err) {
      return null;
    }
};

export const upvotePost = async (pCode, username) => {
  try {
    const fetchOption = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ p_code: pCode, username: username }),
    };
    const response = await fetch(`/post/upvote`, fetchOption);
    const result = await response.json();
    if (result.ERROR) {
      alert(result.ERROR);
      return null;
    } else {
      return result;
    }
  } catch (err) {
    return null;
  }
};

export const getReply = async (pCode) => {
  try {
    const response = await fetch(`/reply/${pCode}/get`);
    const result = await response.json();
    console.log(result.list);
    const data = {
      list: result.replyList,
      count: result.replyCount.p_replies,
    };
    return data;
  } catch (err) {
    return null;
  }
};

export const insertReply = async (data) => {
  try {
    const fetchOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(`/reply/insert`, fetchOption);
    const result = await response.json();
    if (result.ERROR) {
      alert(result.ERROR);
      return null;
    }
    return null;
  } catch (err) {
    return null;
  }
};
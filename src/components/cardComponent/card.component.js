import React from 'react';
import './card.styles.css';
import { contributorUploadApi } from '../../network/endpoint';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class CardComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            latitude: "",
            bilbordTag: "",
            file: [],
            errors: [],
            longitude: "",
            isLoading: false,
            tweets: [],
            showComment: false,
            token: null,
            comments: [],
            newComment: "",
            likes: [],
            userId: null
        }
        this.handleComment = this.handleComment.bind(this);
        this.submitComment = this.submitComment.bind(this);
        this.fetchComment = this.fetchComment.bind(this);
    }

    fetchComment() {
        this.setState({ isLoading: true });
        let token = localStorage.getItem("userData");
        fetch(
          "https://nodetwt-ihossamalbraak686393.codeanyapp.com/tweets/list/1",
          {
            headers: {
              token,
            },
          }
        )
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              this.setState({ tweets: res.tweets });
            }
          })
          .catch((e) => console.error(e))
          .finally(() => {
            this.setState({
              isLoading: false,
              token,
              likes: new Array(this.state.tweets.length),
            });
          });
    }
    componentDidMount() {
        let userId = localStorage.getItem("userId");
        this.setState({ userId: JSON.parse(userId) });
        this.fetchComment();
    }
    handleComment(e) {
        this.setState({ newComment: e.target.value });
    }
    submitComment(e, id) {
        let { token, newComment } = this.state;
        e.preventDefault();
        let obj = {
                content: newComment,
                tweetId: id 
        }
        console.log("content", obj.content)
        fetch(
          "https://nodetwt-ihossamalbraak686393.codeanyapp.com/comments/create",
          {
            method: "POST",
            headers: {
              token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
          }
        )
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              alert("Successful");
              this.onClickComment(id);
            }
          })
          .catch(console.error);
    }
    handleFileChange(e) {
        this.setState({ file: e.target.files[0] })
        //console.log('file', e.target.files[0])
        this.clearValidationErr("uploadFile");
    }

    onLatitudeChange(e) {
        this.setState({ latitude: e.target.value });
        this.clearValidationErr("latitude");
    }

    onLongitudeChange(e) {
        this.setState({ longitude: e.target.value });
        this.clearValidationErr("longitude");
    }

    onBilbordTagChange(e) {
        this.setState({ bilbordTag: e.target.value });
        this.clearValidationErr("bilbordTag");
    }

    showValidationErr(elm, msg) {
        this.setState((prevState) => ({
            errors: [
                ...prevState.errors, {
                    elm,
                    msg
                }
            ]
        }));
    }

    onClickComment = (id) => {
        let { token } = this.state;
        fetch(
          `https://nodetwt-ihossamalbraak686393.codeanyapp.com/comments/list/${id}`,
          {
            headers: {
              token,
            },
          }
        )
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              this.setState({ comments: res.comments, showComment: true });
            }
          })
          .catch(console.error);
        
    }
    onLikeTweet = (id) => {
        let { tweets, userId, token } = this.state;
        for (let favs in tweets[id - 1].favourites) {
            if (userId === favs.userId) {
                return fetch(
                  "https://nodetwt-ihossamalbraak686393.codeanyapp.com/tweets/like",
                  {
                    method: "POST",
                    headers: {
                      token,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      favourite: !favs.like,
                      tweetId: favs.tweetId,
                    }),
                  }
                )
                  .then((res) => res.json())
                  .then((res) => {
                    if (res.success) {
                      alert(favs.like ? "Unliked" : "Liked");
                      this.fetchComment();
                    }
                  });
           }
        }
        return fetch(
          "https://nodetwt-ihossamalbraak686393.codeanyapp.com/tweets/like",
          {
            method: "POST",
            headers: {
              token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              favourite: true,
              tweetId: id,
            }),
          }
        )
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              alert("Liked");
              this.fetchComment();
            }
          });
    }

    clearValidationErr(elm) {
        this.setState((prevState) => {
            let newArr = [];
            for (let err of prevState.errors) {
                if (elm !== err.elm) {
                    newArr.push(err);
                }
            }
            return { errors: newArr };
        });
    }

    submitUpload(e) {
        e.preventDefault();
        
        console.log(this.state);
        
        let validFields = this.checkFields();

        if (validFields) {
            this.setState({ isLoading: true });
            let formData = new FormData();
            let uploadData = {
                latitude: parseFloat(this.state.latitude),
                longitude: parseFloat(this.state.longitude),
                faceTag: this.state.bilbordTag,
                image: this.state.file.name,
                images: this.state.file
            }
            for (let key in uploadData) {
                formData.append(key, uploadData[key])
                console.log(uploadData[key])
            }

            fetch(contributorUploadApi, {
                method: 'POST',
                headers: {
                    'token': localStorage.getItem("userData")
                },
                body: formData
            })
                .then(res => res.json())
                .then(res => {
                    res.success
                      ? toast.success(res.status, { autoClose: 6000 })
                      : toast.error(res.status, { autoClose: 10000 });
                })
                .catch(err => {
                    console.log(err)
                    toast.error('Error',{autoClose: 3000})
                })
            .finally(() => this.setState({isLoading: false}))
        } else {
            toast.error('Invalid fields', {autoClose: 3000})
        }
    }

    checkFields() {
        const {  bilbordTag, file, latitude, longitude } = this.state;
        if (longitude === "") {
            this.showValidationErr("longitude", "Longitude Cannot be empty!")
            return false;
        }
        if (latitude === "") {
            this.showValidationErr("latitude", "Latitude Cannot be empty!")
            return false;
        }
        if (bilbordTag === "") {
            this.showValidationErr("bilbordTag", "Bilbord Tag Cannot be empty!");
            return false;
        }
        if (file === ""){
            this.showValidationErr("uploadFile", "File cannot be empty!");
            return false;
        }
        return true;
    }
    render() {
        const { isLoading, tweets, showComment, comments } = this.state;
        let bilbordTagErr = null,
            uploadFileErr = null,
            latitudeErr = null,
            longitudeErr = null;

        for (let err of this.state.errors) {
            if (err.elm === "bilbordTag") {
                bilbordTagErr = err.msg;
            }
            if (err.elm === "uploadFile") {
                uploadFileErr = err.msg;
            }
            if (err.elm === "latitude") {
                latitudeErr = err.msg;
            }
            if (err.elm === "longitude") {
                longitudeErr = err.msg;
            }
        }
        if (isLoading) {
            return (
              <Loader type="Circles" color="#D60000" height={80} width={80} />
            );
        }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        {tweets.map((v, i) => {
                            return (
                              <div key={i}>
                                <img />
                                <div>
                                  <h4>{v.user.name}</h4>
                                  <p>{v.content}</p>
                                </div>
                                    <div onClick={() => this.onClickComment(v.id)}>comments: {v.comments.length}</div>
                                    <div onClick={() => this.onLikeTweet(v.id)}>Likes: {v.favourites.length} </div>
                                {showComment &&
                                  comments.map((val, id) => {
                                    return (
                                      <div key={id}>
                                        <h6>{val.user.name}</h6>
                                        <p>{val.content}</p>
                                      </div>
                                    );
                                  })}
                                {showComment && (
                                  <div>
                                    <textarea
                                      name="textarea"
                                      rows="5"
                                      cols="30"
                                      minLength="10"
                                                maxLength="20"
                                                value={this.state.newComment}
                                      placeholder="Comment"
                                      onChange={this.handleComment}
                                    />
                                    <button
                                      type="button"
                                                className="login-btn"
                                                onClick={(e) => this.submitComment(e,v.id)}
                                    >Comment</button>
                                  </div>
                                )}
                              </div>
                            );
                            })}
                    </div>
                </div>
            </div>
        );
    }   
}

toast.configure();

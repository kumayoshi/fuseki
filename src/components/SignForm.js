import React from "react";

const SignForm = ({
  onMailChange,
  onPassChange,
  passExistence,
  mailExistence,
  mailChangeExistence,
}) => {
  return (
    <div>
      {mailExistence === "none" || (
        <div>
          <label>
            <p style={styles.labelText}>メールアドレス</p>
            <input
              type="email"
              placeholder="mail@example.com"
              onChange={(e) => onMailChange(e.target.value)}
              style={styles.inputText}
            />
          </label>
        </div>
      )}

      {passExistence === "none" || (
        <div style={styles.passwordBlock}>
          <label>
            <p style={styles.labelText}>パスワード</p>
            <input
              type="password"
              placeholder="パスワード (6文字以上)"
              // value={passValue}
              onChange={(e) => onPassChange(e.target.value)}
              style={styles.inputText}
            />
          </label>
          {mailChangeExistence === "none" || (
            <p style={styles.passwordAttentionText}>
              パスワードをお忘れの方は
              <a className={"text_link"} href={"/passwordreset/"}>
                こちら
              </a>
              から変更をお願いします。
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SignForm;

const styles = {
  labelText: {
    color: "rgba(67,67,67,1)",
    fontSize: "3vw",
  },
  passwordBlock: {
    marginTop: "13vw",
  },
  inputText: {
    width: "100vw",
    margin: "0 calc(50% - 50vw)",
    padding: "5vw 13% 4vw",
    boxSizing: "border-box",
    fontSize: "4.7vw",
    marginTop: "1vw",
    fontWeight: "bold",
  },
  passwordAttentionText: {
    margin: "0 calc(50% - 50vw)",
    fontSize: "3vw",
    marginTop: "1vw",
    padding: "0 3vw",
    textAlign: "right",
  },
};

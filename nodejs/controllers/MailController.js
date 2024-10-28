import sendMail from '../mail/sendMail.js';
const send = async (req, res) => {
  try {
    const { mailRecieve, title, content } = req.body;
    if (!mailRecieve || !title || !content) {
      return res.status(200).json({
        success: 'false',
        mgs: 'Không bỏ trống',
      });
    }
    const sendd = await sendMail(mailRecieve, title, content);
    return res.status(200).json({
      success: 'true',
      mgs: 'Gửi thành công',
      send: sendd,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      mgs: error.message,
    });
  }
};

export { send };

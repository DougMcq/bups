import axios from "axios";
export default async function handler(req, res) {
  try {
    const result = await axios(
      `http://boatusedpartsearch.us/logA.pl?EVENT=Survey:RECOMMEND=${req.body.recommend}:REFER=${req.body.refer}:FEEDBACK=${req.body.feedback}:ALERTS=${req.body.alert}`
    );
    res.status(200).send({ data: result.data });
  } catch (err) {
    res.status(500).send({ data: "failed to fetch data from server" });
  }
}

import axios from "axios";
export default async function handler(req, res) {
  try {
    const result = await axios(
      `http://boatusedpartsearch.us/SearchA.pl?SEARCHNAME=${req.body.name}&EMAIL=${req.body.email}&PART=${req.body.part}&BRAND=${req.body.brand}&DESCRIPTION=${req.body.description}
    `
    );
    res.status(200).send({ data: result.data });
  } catch (err) {
    res.status(500).send({ data: "failed to fetch data from server" });
  }
}

const connection = require("../connection.js");

function index(req, res) {
    const sql = "SELECT * FROM `movies`";
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "database query failed" });
        console.log(results);
        let data = results;
        const response = {
            totalCount: results.length,
            data,
        }
        res.json(response);
    });
}

function show(req, res) {
    const id = parseInt(req.params.id);
    const sql = `SELECT movies.*, AVG(reviews.vote) AS media_voti
        FROM movies
        JOIN reviews
        ON movies.id = reviews.movie_id
        WHERE movies.id = ?
        GROUP BY reviews.movie_id`;
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "database query failed" });
        console.log(results);
        const item = results[0];
        if (!item) {
            return res.status(404).json({ error: "l'elemento non esiste" });
        }
        console.log(item);
        const sqlReviews = `SELECT * FROM reviews WHERE movie_id = ?`;
        connection.query(sqlReviews, [id], (err, reviews) => {
            if (err) return res.status(500).json({ error: "database query failed" });
            item.reviews = reviews;
            res.json({ success: true, item });
        });
    });
}

function destroy(req, res) {
    const id = parseInt(req.params.id);
    const sql = "DELETE FROM `movies` WHERE `id` = ?";
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "database query failed" });
        console.log(results);
        res.sendStatus(204);
    });
}

module.exports = {
    index,
    show,
    destroy,
}
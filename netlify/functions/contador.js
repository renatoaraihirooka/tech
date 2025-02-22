const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = async (event, context) => {
    const client = new faunadb.Client({ secret: 'YOUR_FAUNADB_SECRET' });

    try {
        // Fetch the current visit count
        const result = await client.query(
            q.Get(q.Match(q.Index('all_visits')))
        );

        // Increment the visit count
        const newCount = result.data.count + 1;

        // Update the visit count in the database
        await client.query(
            q.Update(result.ref, { data: { count: newCount } })
        );

        return {
            statusCode: 200,
            body: newCount.toString(),
        };
    } catch (error) {
        // If no visit count exists, create one
        if (error.message === 'instance not found') {
            await client.query(
                q.Create(q.Collection('visits'), { data: { count: 1 } })
            );
            return {
                statusCode: 200,
                body: '1',
            };
        }

        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    }
};
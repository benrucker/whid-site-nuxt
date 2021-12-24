<script>
export default {
    middleware: [
        function({ redirect, route }) {
            if (!route.query.s && !route.query.s)
                redirect({
                    name: "dub",
                    query: { error: true },
                });

            let url = `/dub/${route.query.s}/${route.query.e}`
            if (route.query.t) query = `?t=${route.query.t}`
            redirect(url);
        }
    ]
}
</script>
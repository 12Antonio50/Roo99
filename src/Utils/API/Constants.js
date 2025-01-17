//const SERVER_IP = "servidor-61h9.onrender.com";
//const SERVER_IP = "serverbyaie.servebeer.com";
const SERVER_IP = "8ln1bdnq-4000.usw3.devtunnels.ms";

export const ENV = {
    BASE_PATH: `https://${SERVER_IP}/API/v1`,
    API_ROUTES: {
        xNRHIms3BtH1hv7cINbfjb6lalKFl7ihYmaYWRji5hZUrcJ8ObfvHe8KQ5VnXGIpRfU04OhSVdEYELWr562D7doVhtEAyAN: "/codigo/crear/renta",
        PdNg6TfsOYdyVbW4YDZeiSS7V3ggSdBODBQ5qk9VaKm8TeMPKAeZk0cIgRJY6VMxzGKqQ9JoqbaOP3B12mas1MOwGi3kVWrI: "/codigo/enviar/codigo",
        uXYiWYH7FEE0lqfc2ct8IZmTp5SPyyLWweZWcmycXii6Z7ZRdFTpnFaKfaejQQD: "/codigo/obtener",
        TdEPOaKn2iFjE4M4TjNz7JuXClpXgYC3Jdy9Q7vJGlmlt8UUWEsckXLq97BLWMfhgCL4zWNoOnc55jQcXeaArhj24TI1Vp: "/codigo/obtener/pagados",
        M8REzEiDtu6wSBlYuH8gXbqbEEEsmih5jnQVPt2xJDxZsGQAhxZy40xzgZhlTczD8zsN4FCpra5mIY64NUi2EDKkJM: "/codigo/obtener/pendientes",
        GZEh4N3n4OTDAz9ZWMtv6SIF6Sb46GpOTyZ4VgA4wXWmM4pT7ZAObPYRbJKuf2ne0OQcOpdR3neje2n7mllFzB7S9j0g: "/codigo/obtener/unico",
        V9lEjmqfsIXhx5ZmeXkUSiZ9jwvlRczXYT08rZoqW4Wxa24s0CmzMIOn0EbXzoR1: "/codigo/eliminar",
        Bw21r8OXICUCWT9grWplBzASut6kpvdUG3KviPu3nAWZdZBiMiyf6YUUMwuHfOMQSvNAGEYG1rJI4tcFH3wSX0OW3NqUm5: "/codigo/actualizar",
        PeS938hjFqmXqk59uOIV8KnNDdyrqaUA9IPMklB7OBMhTLIkYjRNNkg9lfutOx: "/codigo/ingresos",
        HORAS: "/codigo/horas/obtener",
        knhWyU9pm2u22cKe5rentuIfVSJMPYbyZSpNz6caf2ggu5zfjTU7nOogByLj3lXwz1pYgzRIYM34vtDE6aTwDdsb86h1s4W: "/codigo/porcentaje/mes",
        //Office
        HJypkO5WH2sim9EBeCrSod9v5EVsFsXkNcAXMnvVWkDhxKOBlYAZGsvhhnqDX: "/oficina/crear",
        nCuWL3omVwlNkBPbxCOO9fiuWirLaLhM6t7AVbiEFy8XASd5H9qZgUlXel3DCR4DNFtdTcIxiocR0bWv3UHd3GCgvP7El5: "/oficina/buscar/todas",
        k0smyjJV0ybzcLFMNMBfdZbF5K8BFyHPo3ORWvfn0GydqfrZKHArB6HT6IEjM8vTHfUcGDiTe2iJRdWwIQ5l2vJAXiAGPu: "/oficina/buscar/habilitadas",
        VdLunVWaEaoUegm6qN9Gk4xWJboUJAM6EnDgOl7XUKpz8neJCxDxX8vnR5lzj5Beoqr8OdYOc6m1EkAblN2FqzwKZQsAS5: "/oficina/buscar/desahabilitadas",
        rtJDIXE9Kc35Z93qrXIJ9ddowrtHdoHpQgSaHK1YzhCfYVkylqXxdTZ7twDfHTs1DwglQ8KAAR9aVmyLz5HPQDcnifLN: "/oficina/buscar/unica",
        vRaK8BPs6QJDz6AyXmjKtq75tkfXRO39DembCnK8ACy6T1aLyiZdFbBygQxPvvF5iiPIqzlxogXOflwAgc843Yl1jTTW: "/oficina/actualizar",
        XmwEotUVjdMwhq6nb9u5HCUyna4Nau4rGWJqUp6B1vj67UbMTvb2nisx67AkESItvWVEiZXupE0yQFdSWCN79tXpxpXAu: "/oficina/deshabilitar",
        LYvhw9BfF9q31xl8IYXgZQLwl5y7CtATzKPSLtyUqr604x62mqvDxLjbpnhTiWQR0SWBMKb1ap1MZRapebgsAd8o7UiZBgu: "/oficina/habilitar",
        o4SaQNSaodSOAzifNtfnxmUzvxLF9gSesHhY03lMk0uOZ80xqnL6Z5MWGPrNYQ315hyvldlosjIyLceoWQrFL6j5GM4d4: "/oficina/eliminar",
        OpU8fhe5zuxk0U9KzlNxavZMVDvpxHrlYxJCZ4Ncuor14TdkxxIOcWyM6mnJoVadOb4NdPqKqSQvcm71RdgmsUJFkr4OdEq: "/oficina/agregar/codigo",
        N6MkHCw9HvrttEOsTcc1xa3Eum6d4jkMg9OSyEgayUryFVy4PTbVaFm1OY10SmoQ4zhaSTzRDrkMC39w8MOBUI2HER5irB: "/oficina/porcentaje/codigos",
        //Space
        qqxUzmvE80jhIp00JkUx3rb3m3pj1rs9dmedPUFfa9cGua6wEPilOpdzNifd0v: "/espacio/crear",
        TINCxXBMbkQ2eUvOWJXUeYjFjUWgmkZbULeLH9EzlQGWr6kbkVVOzJGCw22r0: "/espacio/buscar",
        xcbrWVdS4eAYwuakX4m8rtZGTANuvRP0krmhbmKAXH6qeNqz3i1DALainxb6Ubo2viAZGe2DOT3zajWO7o9aV2jEnyTC: "/espacio/actualizar",
        erC4QljhfqCVUnJdWK7fPyF3gnXwkGlOlhQQXOVf0hYBLxX6gQP8mdGNzAExOxdHlstt4y0yKKAOyG9mcids15qiBQUj: "/espacio/eliminar",
        O29p2PIWKvRwVv4mPnxzVeOA4RhmmHwB1w9x0A49Pzwp1MDFa9Ir9OB3UhuvjvFABQghvF6ZoyeSi59etTRAcKKfYI: "/espacio/oficina/eliminar",
        Dm8y2sIxHfmaiWnQjhfsjFvJf9cA3vpB3Y1zQzNnabHm1S1htbUBQSvYx1bxzr6cLAA8Jo7pipcriJzrFrraHJb99EOZ0Frn: "/espacio/agregarOficina",
        ra4qhhL2lQwjSpXNp5dvivTm94c8uDmrlZqFBiOvxYHhvsIhIPlWaA1jXoVvJaHiYrzbPNPdDHVu7R89zIsN39jkPEs74: "/espacio/porcentaje/mes",
        //user
        HMaYWl4mzfrh4gPv7iuQpWYATRn6q5ZM9kgnBZsXarKHIiHRh3uvu2QprzyDY9E2FYbIBrKRF5gnx2qrgTytqFBe2V2: "/usuario/obtenerUnico/rootWorking",
        EeyUq9CtfW4WWU58KTJOxlnEphFHw3DT694MFPEygV6XyTHRMKyehRTEo7M57LzReozCJOX2uasfnRo7ZCp9Co12qJSfKR: "/usuario/actualizar-root",
        aYTukpJhJPAYUi3rWgBtQjPEhxOBzTiROJAPE4sIuVTCppWBNDuXofPMvvemf8ZVwVmmJWAyMGdkH6IgaWVF2IWkly1sB: "/usuario/buscar/administrador-apoyo-root",
        sKDKOBiQ4xPq1OOmxhGqMMQ9u2o5gjxcJZxxIxrW8p9WH0VDIWGM2BHEbIYkRd9MfGhz3rCW3hoZvZjr2qudF4n9l2M: "/usuario/buscar/recepcionista",
        Qa9vFpKqi78bpSA0kOotbEPqwkyRUHXBdLC7ELMLHEGMfvegYzCXF3ckaooxz9DXyoxdoZZJKKfZzyAsr3HpjSBK9S: "/usuario/crear-root",
        t9FCQGbGr2D2j1SNUELLU6ATj4uQBcSeqonXy7NSLlc79AkWosLMfl3Y3oJE9m9Flp3aZNklY8CPCKP9PBqKxUjXFsFt18: "/usuario/eliminar-root",
        //login and recet
        ZMf1M99pEHw5JyUfo7AlVD6Yha74sTqpWnHahLPyWqRutnCXvqUMTlozUXeSMh1: "/auth/login-root",
        uGwT7NxqmpFvM5I283y0qAOWhW5VqxeajNVDMv8iNO6kQEHZ5s99JwuIh2F6Kkct9Pi1EaxXGBdbCyx3bGlfvXBHxPkDL: "/usuario/reenviar/correo-root",
        //other
        KqRf30ke4nNT4iwN6Cnbq9HdKmYKwVb26Y8763PNN6ydQYgKKl4z52jPfxiOyyXevdYX9SQS99KmppaQXQj7o1BxKMeftTG: "https://rootworking.mx/",
        correo: "/enviar/notificacion/ligero",
        correo_exp: "/enviar/notificacion"
    }
}
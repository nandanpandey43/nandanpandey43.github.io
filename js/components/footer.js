export const Footer = () => `
    <footer class="footer">
        <div class="container">
            <div class="flex justify-between items-center">
                <p>&copy; ${new Date().getFullYear()} Backend Dev. Built with Vanilla JS.</p>
                <div class="flex gap-md">
                    <a href="/github">GitHub</a>
                    <a href="/linkedin">LinkedIn</a>
                    <a href="/twitter">Twitter</a>
                </div>
            </div>
        </div>
    </footer>
`;

import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <footer className="py-4 bg-footer mt-auto">
                <div className="container-fluid">
                    <div className="d-flex align-items-center justify-content-between small">
                        <div className="text-muted-1">© 2020 <b>Manage My Venue</b>. by <a href="#">Project</a></div>
                        <div className="footer-links">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

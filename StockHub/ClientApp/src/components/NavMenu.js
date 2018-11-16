import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
    displayName = NavMenu.name

    render() {
        return (
            <Navbar inverse fixedTop fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={'/'}>Test</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to={'/'} exact>
                            <NavItem>
                                <Glyphicon glyph='home' /> Home
              </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/MostActive'}>
                            <NavItem>
                                <Glyphicon glyph='education' /> Most Active Stocks
                </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/BottomStocks'}>
                            <NavItem>
                                <Glyphicon glyph='education' /> Bottom Stocks
              </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/topstocks'}>
                            <NavItem>
                                <Glyphicon glyph='th-list' /> Top Stocks
              </NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

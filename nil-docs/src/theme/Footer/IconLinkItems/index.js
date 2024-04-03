import IconLinkItem from "../IconLinkItem";
import DiscordIcon from '@site/static/img/footer/discord.svg';

export default function IconLinkItems() {
    const GoToCommunityLink = (Url) => () => {
        window.open(Url);
    };

    return (
        <div className="communityLinksContainer">
            <IconLinkItem source={DiscordIcon} onIconClick={GoToCommunityLink('https://discord.gg/KmTAEjbmM3')}></IconLinkItem>
            <IconLinkItem source={require('@site/static/img/footer/github.svg')} onIconClick={GoToCommunityLink('https://github.com/nilfoundation')}></IconLinkItem>
            <IconLinkItem source={require('@site/static/img/footer/telegram.svg')} onIconClick={GoToCommunityLink('https://t.me/nilfoundation')}></IconLinkItem>
        </div>
    );
}
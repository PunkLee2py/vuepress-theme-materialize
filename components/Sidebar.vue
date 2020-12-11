<template>
    <ul id="sidebar-mobile" class="sidenav">
        <!-- Avatar -->
        <li>
            <div class="user-view">
                <div class="avatar animate_hover">
                    <Img
                        :src="
                            $themeConfig.avatar ||
                                require('@theme/images/avatar.png')
                        "
                        class="circle"
                    />
                </div>
            </div>
        </li>
        <!-- Divider -->
        <li><div class="divider"></div></li>
        <!-- NavLink Btn -->
        <li v-for="(item, index) in data" :key="item.link || index">
            <!-- Dropdown -->
            <ul v-if="item.type === 'links'" class="collapsible">
                <li>
                    <a class="collapsible-header waves-effect waves-light">
                        <i class="material-icons left">{{
                            item.icon || "menu"
                        }}</i>
                        <span>{{ item.text }}</span>
                        <i class="material-icons right">arrow_drop_down</i>
                    </a>
                    <div class="collapsible-body">
                        <ul>
                            <li v-for="(t, i) in item.items" :key="i">
                                <NavLink :item="t" />
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
            <NavLink v-else :item="item" />
        </li>
    </ul>
</template>

<script>
import NavLink from "@theme/components/NavLink";

export default {
    components: { NavLink },
    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },
};
</script>

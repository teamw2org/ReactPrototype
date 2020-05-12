import React, { useState, useEffect } from 'react';
import base64 from 'react-native-base64';
import 'antd/dist/antd.css';
import { Tree } from 'antd';

function updateTreeData(list, key, children) {
    return list.map(node => {
        if (node.key === key) {
            return { ...node, children };
        }
        if (node.children) {
            return { ...node, children: updateTreeData(node.children, key, children) };
        }

        return node;
    });
}

export default function BucketsTree() {
    const [treeData, setTreeData] = useState([]);
    useEffect(()=>{loadData('','')},[])

        function loadData (parentEntity, parentIdentifier) {

        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + base64.encode('gnadmin:werk2admin'));
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');
        headers.append('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
        headers.append('Access-Control-Allow-Headers', 'Content-Type, Accept');

        fetch(
            'http://localhost:40080/PlannerRESTService/aio/EN/v1/publications/buckets?sessionid=alamakota&parentEntityIdentifier=' +
            parentEntity +
            '&parentIdentifier=' +
            parentIdentifier,
            {
                method: 'GET',
                headers: headers,
            }
        )
            .then((response) => response.json())
            .then((json) => {
                const dataForTree = json.map((el) => {
                    return {
                        id: el.identifier === null ? 0 : el.identifier,
                        pId: parentIdentifier === null ? 0 : parentIdentifier,
                        key: el.identifier,
                        title:
                            el.label +
                            ' : ' +
                            el.identifier +
                            ' : ' +
                            parentIdentifier +
                            ' : ' +
                            el.entityBucketId,
                        entityIdentifier: el.entityBucketId,
                        icon: (
                            <img
                                src={
                                    '/PubServerKernel/Globals?img=/entity_icons/' +
                                    (el.groupIdentifier === null || el.groupIdentifier === ''
                                        ? '2020.gif'
                                        : el.groupIdentifier)
                                }
                                alt="logo"
                                style={{
                                    width: '16px',
                                    height: '16px',
                                    verticalAlign: 'unset',
                                }}
                            />
                        ),
                    };
                });
                setTreeData(dataForTree);
            });
    };

    function onLoadData ({ key, children }) {

        return new Promise(resolve => {
            if (children) {
                resolve();
                return;
            }
            let element = {};
            getElement(key, treeData);

            function getElement(key, elementsArray) {
                if(elementsArray){
                for (let i = 0; i < elementsArray.length; i++) {
                    if (elementsArray[i].key === key) {
                        element = elementsArray[i];
                        return;
                    } else{
                        getElement(key, elementsArray[i].children);
                    }
                }}
            }

            let headers = new Headers();
            headers.set('Authorization', 'Basic ' + base64.encode('gnadmin:werk2admin'));
            headers.append('Access-Control-Allow-Origin', '*');
            headers.append('Access-Control-Allow-Credentials', 'true');
            headers.append('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
            headers.append('Access-Control-Allow-Headers', 'Content-Type, Accept');

            fetch(
                'http://localhost:40080/PlannerRESTService/aio/EN/v1/publications/buckets?sessionid=alamakota&parentEntityIdentifier=' +
                element.entityIdentifier +
                '&parentIdentifier=' +
                key,
                {
                    method: 'GET',
                    headers: headers,
                }
            )
                .then((response) => response.json())
                .then((json) => {
                    const dataForTree = json.map((el) => {
                        return {
                            id: el.identifier === null ? 0 : el.identifier,
                            key: el.identifier,
                            title:
                                el.label +
                                ' : ' +
                                el.identifier +
                                ' : ' +
                                el.entityBucketId,
                            entityIdentifier: el.entityBucketId,
                            icon: (
                                <img
                                    src={
                                        '/PubServerKernel/Globals?img=/entity_icons/' +
                                        (el.groupIdentifier === null || el.groupIdentifier === ''
                                            ? '2020.gif'
                                            : el.groupIdentifier)
                                    }
                                    alt="logo"
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                        verticalAlign: 'unset',
                                    }}
                                />
                            ),
                        };
                    });

                    setTreeData(origin => updateTreeData(origin,key,dataForTree));

                    resolve();
                });
        });

    };
    return <Tree loadData={onLoadData} treeData={treeData} />;
};

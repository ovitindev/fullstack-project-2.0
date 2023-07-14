import { shallowMount } from '@vue/test-utils';
import App from '../src/App.vue';
import ParticipationHeader from '../src/components/ParticipationHeader.vue';
import ParticipationList from '../src/components/ParticipationList.vue';

describe('App', () => {
  test('Renderizar os elementos corretamente', () => {
    const wrapper = shallowMount(App);

    expect(wrapper.find('main').exists()).toBeTruthy();
    expect(wrapper.findComponent(ParticipationHeader).exists()).toBeTruthy();
    expect(wrapper.findComponent(ParticipationList).exists()).toBeTruthy();
  });

  test('Chamar o método "handleCreate" quando o componente "ParticipationHeader" emitir o evento "create"', async () => {
    const handleCreateSpy = jest.spyOn(App.methods, 'handleCreate').mockResolvedValueOnce(true);
    const wrapper = shallowMount(App);

    wrapper.findComponent(ParticipationHeader).vm.$emit('create');

    await wrapper.$nextTick();

    expect(handleCreateSpy).toHaveBeenCalled();
  });

  test('Chamar o método "handleDelete" quando o componente "ParticipationList" emitir o evento "delete"', async () => {
    const handleDeleteSpy = jest.spyOn(App.methods, 'handleDelete').mockResolvedValueOnce(true);
    const wrapper = shallowMount(App);

    wrapper.findComponent(ParticipationList).vm.$emit('delete');

    await wrapper.$nextTick();

    expect(handleDeleteSpy).toHaveBeenCalled();
  });
});

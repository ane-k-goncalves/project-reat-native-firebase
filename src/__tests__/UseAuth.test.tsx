import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  renderHook,
} from "@testing-library/react-native";
import Index from "../../app/index";
import useAuth from "../../firebase/hooks/useAuth";
import { useRouter } from "expo-router";

jest.mock("../../firebase/hooks/useAuth", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    loading: true,
    user: null,
  }),
}));

describe("useAuth Hook", () => {
  it("iniciar com loading=true e user=null", () => {
    const { result } = renderHook(() => useAuth());
    
    expect(result.current).toBeDefined();
    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBeNull();
  });

  it('enviar e-mail e senha ao pressionar o botão de login', async () => {
    const loginMock = jest.fn().mockResolvedValue(undefined);

    // Mock do hook useAuth para simular estado de carregamento e a função login
    (useAuth as jest.Mock).mockReturnValue({
      login: loginMock,
      user: null,
      loading: false,  // Simula que o loading acabou
    })

    const { getByPlaceholderText, getByText } = render(<Index />);

    // Aguarda até que os campos de entrada estejam disponíveis
    await waitFor(() => {
      expect(getByPlaceholderText('email')).toBeTruthy();
      expect(getByPlaceholderText('password')).toBeTruthy();
    });

    // Preenche os campos de email e senha
    fireEvent.changeText(getByPlaceholderText('email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('password'), 'password123');

    // Simula o clique no botão de login
    fireEvent.press(getByText('Login'));

    // Verifica se a função login foi chamada com os valores corretos
    expect(loginMock).toHaveBeenCalledWith('test@example.com', 'password123');
  });
  
})

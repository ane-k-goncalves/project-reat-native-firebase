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

   
    (useAuth as jest.Mock).mockReturnValue({
      login: loginMock,
      user: null,
      loading: false, 
    })

    const { getByPlaceholderText, getByText } = render(<Index />);

   
    await waitFor(() => {
      expect(getByPlaceholderText('email')).toBeTruthy();
      expect(getByPlaceholderText('password')).toBeTruthy();
    });

    
    fireEvent.changeText(getByPlaceholderText('email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('password'), 'password123');

    
    fireEvent.press(getByText('Login'));

    
    expect(loginMock).toHaveBeenCalledWith('test@example.com', 'password123');
  });
  
})
